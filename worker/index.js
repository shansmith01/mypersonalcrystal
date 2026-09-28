// Cloudflare Email Service, Workers send_email binding.
// https://developers.cloudflare.com/email-service/api/send-emails/workers-api/
// From is the Email Sending subdomain. To is the public shop address.
// The visitor's address is Reply-To only. The birth survey never reaches this worker.

var FROM = "orders@forms.mypersonalcrystal.com";
var TO = "orders@mypersonalcrystal.com";

var CRYSTALS = {
  "clear-quartz": "Clear quartz",
  "amethyst": "Amethyst",
  "rose-quartz": "Rose quartz",
  "smoky-quartz": "Smoky quartz",
  "citrine": "Citrine",
  "tigers-eye": "Tiger's eye",
  "carnelian": "Carnelian",
  "red-jasper": "Red jasper",
  "agate": "Agate",
  "green-aventurine": "Green aventurine",
  "obsidian": "Obsidian",
  "fluorite": "Fluorite",
  "sodalite": "Sodalite",
  "howlite": "Howlite",
  "hematite": "Hematite"
};

var METALS = {
  "aluminium": "Aluminium",
  "iron": "Iron",
  "copper": "Copper",
  "zinc": "Zinc",
  "tin": "Tin"
};

export default {
  async fetch(request, env) {
    var url = new URL(request.url);
    if (request.method === "POST" && url.pathname === "/api/order") {
      return sendOrder(request, env);
    }
    if (request.method === "POST" && url.pathname === "/api/contact") {
      return sendContact(request, env);
    }
    if (url.pathname === "/api/order" || url.pathname === "/api/contact" || url.pathname.indexOf("/api/") === 0) {
      return answer(request, false, "That address is not a form.", 404);
    }
    if (env && env.ASSETS) return env.ASSETS.fetch(request);
    return new Response("Not found", { status: 404 });
  }
};

async function sendOrder(request, env) {
  if (!sameOrigin(request)) return answer(request, false, "The message did not send.", 403);
  var parsed = await readBody(request);
  if (parsed.error) return answer(request, false, parsed.error, 400);
  var data = parsed.data;

  var name = take(data, "fullname", 200);
  var email = take(data, "email", 200);
  var address = take(data, "address", 1000);
  var country = take(data, "country", 100);
  var crystal = take(data, "crystal", 40);
  var metal = take(data, "metal", 20);
  var note = take(data, "note", 2000);
  if (name.error || email.error || address.error || country.error || crystal.error || metal.error || note.error) {
    return answer(request, false, "That was too long to send.", 400);
  }
  if (!name.value || !email.value || !address.value || !country.value || !crystal.value || !metal.value) {
    return answer(request, false, "Please fill in the name, email, address, country, crystal, and metal.", 400);
  }
  if (!validEmail(email.value)) {
    return answer(request, false, "That email address did not look right.", 400);
  }
  if (!CRYSTALS[crystal.value] || !METALS[metal.value]) {
    return answer(request, false, "Please choose a crystal and a metal from the list.", 400);
  }

  var text = [
    "Order from the Shannon Smith form.",
    "",
    "Name: " + name.value,
    "Email: " + email.value,
    "Postal address: " + address.value,
    "Country: " + country.value,
    "Crystal: " + CRYSTALS[crystal.value],
    "Metal: " + METALS[metal.value],
    "Note: " + (note.value || "(none)"),
    "",
    "They pay postage plus a flat customising fee of NZ$15."
  ].join("\n");

  return deliver(request, env, {
    subject: "Order from " + oneLine(name.value),
    replyTo: email.value,
    text: text
  });
}

async function sendContact(request, env) {
  if (!sameOrigin(request)) return answer(request, false, "The message did not send.", 403);
  var parsed = await readBody(request);
  if (parsed.error) return answer(request, false, parsed.error, 400);
  var data = parsed.data;

  var name = take(data, "fullname", 200);
  var email = take(data, "email", 200);
  var message = take(data, "message", 4000);
  if (name.error || email.error || message.error) {
    return answer(request, false, "That was too long to send.", 400);
  }
  if (!name.value || !email.value || !message.value) {
    return answer(request, false, "Please fill in your name, email, and a message.", 400);
  }
  if (!validEmail(email.value)) {
    return answer(request, false, "That email address did not look right.", 400);
  }

  var text = [
    "Message from the Shannon Smith contact form.",
    "",
    "Name: " + name.value,
    "Email: " + email.value,
    "",
    message.value
  ].join("\n");

  return deliver(request, env, {
    subject: "Message from " + oneLine(name.value),
    replyTo: email.value,
    text: text
  });
}

async function deliver(request, env, mail) {
  if (!env.EMAIL || typeof env.EMAIL.send !== "function") {
    return answer(request, false, "The message did not send. Email is not switched on for this site.", 500);
  }
  try {
    await env.EMAIL.send({
      to: TO,
      from: FROM,
      replyTo: mail.replyTo,
      subject: mail.subject,
      text: mail.text
    });
  } catch (error) {
    return answer(request, false, plainSendError(error), 502);
  }
  return answer(request, true, "", 200);
}

function plainSendError(error) {
  var code = error && error.code;
  if (code === "E_SENDER_NOT_VERIFIED" || code === "E_SENDER_DOMAIN_NOT_AVAILABLE") {
    return "The message did not send. The shop domain is not onboarded for Email Sending yet.";
  }
  return "The message did not send. Please write to orders@mypersonalcrystal.com yourself.";
}

function answer(request, ok, error, status) {
  var type = request.headers.get("content-type") || "";
  var accept = request.headers.get("accept") || "";
  var asJson = type.indexOf("application/json") !== -1 || accept.indexOf("application/json") !== -1;
  if (asJson) {
    return new Response(JSON.stringify({ ok: ok, error: error || "" }), {
      status: status,
      headers: { "content-type": "application/json; charset=utf-8" }
    });
  }
  var title = ok ? "Thank you" : "Sorry";
  var sentence = ok
    ? "Thank you. We sent that to orders@mypersonalcrystal.com."
    : (error || "The message did not send.");
  var html = "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\"><title>" + title + "</title></head><body><p>" +
    escapeHtml(sentence) + "</p><p><a href=\"/\">Back to the shop</a></p></body></html>";
  return new Response(html, {
    status: status,
    headers: { "content-type": "text/html; charset=utf-8" }
  });
}

async function readBody(request) {
  var declared = Number(request.headers.get("content-length") || "0");
  if (declared > 20000) return { error: "That was too long to send." };
  var type = request.headers.get("content-type") || "";
  if (type.indexOf("application/json") !== -1) {
    var text = await request.text();
    if (text.length > 20000) return { error: "That was too long to send." };
    try {
      var data = JSON.parse(text);
      if (!data || typeof data !== "object" || Array.isArray(data)) {
        return { error: "That form did not read properly." };
      }
      return { data: data };
    } catch (e) {
      return { error: "That form did not read properly." };
    }
  }
  var form = await request.formData();
  var fields = {};
  form.forEach(function (value, key) {
    if (typeof value === "string") fields[key] = value;
  });
  return { data: fields };
}

function take(data, name, max) {
  var value = data[name];
  if (typeof value !== "string") value = "";
  value = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim();
  if (value.length > max) return { error: true, value: "" };
  return { error: false, value: value };
}

function oneLine(value) {
  return value.replace(/[\r\n]+/g, " ").slice(0, 120);
}

function validEmail(value) {
  return value.length <= 200 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sameOrigin(request) {
  var origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch (e) {
    return false;
  }
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
