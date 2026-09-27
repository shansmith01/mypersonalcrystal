"use strict";

/* Ordinary tropical dates. The sun can slip a day either side in a given year. */
var SIGNS = [
  {
    name: "Aries",
    stone: "carnelian",
    stoneName: "Carnelian",
    stoneWhy: "The usual Aries stone is diamond, and diamond costs too much for this shop. Carnelian is the orange-red one people already tie to Aries, so that is what we send.",
    metal: "iron",
    metalName: "Iron",
    metalWhy: "Aries is ruled by Mars, and iron is Mars's old metal."
  },
  {
    name: "Taurus",
    stone: "green-aventurine",
    stoneName: "Green aventurine",
    stoneWhy: "The usual Taurus stone is emerald. We do not keep emeralds. Green aventurine is the inexpensive green pebble we use instead.",
    metal: "copper",
    metalName: "Copper",
    metalWhy: "Taurus is ruled by Venus, and copper is Venus's old metal."
  },
  {
    name: "Gemini",
    stone: "agate",
    stoneName: "Agate",
    stoneWhy: "Pearl is the usual modern Gemini stone, and pearl costs too much. Agate is the older Gemini stone, and we have plenty of it.",
    metal: "zinc",
    metalName: "Zinc",
    metalWhy: "Gemini is ruled by Mercury. The old metal is quicksilver, which we will not post. Zinc is the stand-in."
  },
  {
    name: "Cancer",
    stone: "rose-quartz",
    stoneName: "Rose quartz",
    stoneWhy: "The usual Cancer stone is ruby, which is far too dear. We send rose quartz, the pink one people buy when they talk about Cancer's softer side.",
    metal: "aluminium",
    metalName: "Aluminium",
    metalWhy: "Cancer is ruled by the Moon. Silver is the moon metal and it costs too much. Aluminium is the silvery lump we can afford."
  },
  {
    name: "Leo",
    stone: "tigers-eye",
    stoneName: "Tiger's eye",
    stoneWhy: "Peridot is the usual Leo stone and we do not stock it. Tiger's eye is the golden-brown one in the drawer that people already call a Leo stone.",
    metal: "aluminium",
    metalName: "Aluminium",
    metalWhy: "Leo is ruled by the Sun. Gold is the sun metal and we do not sell gold. Aluminium is the bright cheap one."
  },
  {
    name: "Virgo",
    stone: "sodalite",
    stoneName: "Sodalite",
    stoneWhy: "The usual Virgo stone is sapphire, and sapphire costs too much. Sodalite is the blue one we send instead.",
    metal: "zinc",
    metalName: "Zinc",
    metalWhy: "Virgo is ruled by Mercury, same as Gemini. Quicksilver is not for the post, so the metal is zinc."
  },
  {
    name: "Libra",
    stone: "fluorite",
    stoneName: "Fluorite",
    stoneWhy: "The usual Libra stone is opal, which we cannot afford. Fluorite is the pale green crystal we keep in its place.",
    metal: "copper",
    metalName: "Copper",
    metalWhy: "Libra is ruled by Venus, and copper is Venus's old metal."
  },
  {
    name: "Scorpio",
    stone: "citrine",
    stoneName: "Citrine",
    stoneWhy: "The usual Scorpio stone is topaz, and topaz costs too much. Citrine is the proper cheap November stone, so that is the one.",
    metal: "iron",
    metalName: "Iron",
    metalWhy: "We use Scorpio's old ruler, Mars, not the newer one. Iron is Mars's metal."
  },
  {
    name: "Sagittarius",
    stone: "howlite",
    stoneName: "Howlite",
    stoneWhy: "The usual Sagittarius stone is turquoise, which is too dear. Howlite is the inexpensive stand-in the stone shops use.",
    metal: "tin",
    metalName: "Tin",
    metalWhy: "Sagittarius is ruled by Jupiter, and tin is Jupiter's old metal."
  },
  {
    name: "Capricorn",
    stone: "red-jasper",
    stoneName: "Red jasper",
    stoneWhy: "The usual Capricorn stone is garnet, and garnet costs too much. Red jasper is the dark red pebble we send instead.",
    metal: "zinc",
    metalName: "Zinc",
    metalWhy: "Capricorn is ruled by Saturn. Lead is Saturn's old metal and we will not post lead. Zinc is the grey stand-in."
  },
  {
    name: "Aquarius",
    stone: "amethyst",
    stoneName: "Amethyst",
    stoneWhy: "Amethyst is the usual Aquarius stone, and it is already cheap, so you get the real one. No stand-in.",
    metal: "zinc",
    metalName: "Zinc",
    metalWhy: "We use Aquarius's old ruler, Saturn. Lead is not for the post, so the metal is zinc."
  },
  {
    name: "Pisces",
    stone: "clear-quartz",
    stoneName: "Clear quartz",
    stoneWhy: "The usual Pisces stone is aquamarine, which costs too much. Clear quartz is the water-clear one we send instead.",
    metal: "tin",
    metalName: "Tin",
    metalWhy: "We use Pisces's old ruler, Jupiter, and tin is Jupiter's metal."
  }
];

var MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var TIME_LABELS = {
  "0": "about midnight",
  "2": "about 2 in the morning",
  "4": "about 4 in the morning",
  "6": "about 6 in the morning",
  "8": "about 8 in the morning",
  "10": "about 10 in the morning",
  "12": "about midday",
  "14": "about 2 in the afternoon",
  "16": "about 4 in the afternoon",
  "18": "about 6 in the evening",
  "20": "about 8 in the evening",
  "22": "about 10 at night"
};

function sunSignIndex(month, day) {
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 9;
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 10;
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 11;
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 0;
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 1;
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 2;
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 3;
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 4;
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 5;
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 6;
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 7;
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 8;
  return -1;
}

function risingOffset(hour) {
  var h = parseInt(hour, 10);
  if (h < 6) h += 24;
  return Math.floor((h - 6) / 2) % 12;
}

function el(tag, text) {
  var node = document.createElement(tag);
  if (text != null) node.textContent = text;
  return node;
}

function clearNode(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

function queryParams() {
  var out = {};
  var q = window.location.search.replace(/^\?/, "");
  if (!q) return out;
  var parts = q.split("&");
  var i;
  for (i = 0; i < parts.length; i++) {
    var bits = parts[i].split("=");
    var key = decodeURIComponent(bits[0] || "");
    var val = decodeURIComponent((bits.slice(1).join("=") || "").replace(/\+/g, " "));
    out[key] = val;
  }
  return out;
}

function setSelect(select, value) {
  if (!select || !value) return false;
  var i;
  for (i = 0; i < select.options.length; i++) {
    if (select.options[i].value === value) {
      select.value = value;
      return true;
    }
  }
  return false;
}

function initSurvey() {
  var form = document.getElementById("survey-form");
  var result = document.getElementById("result");
  if (!form || !result) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearNode(result);
    result.hidden = false;

    var dateValue = form.dob.value;
    if (!dateValue) {
      result.appendChild(el("p", "Please put a date of birth in. We cannot pick a stone without it."));
      return;
    }

    var bits = dateValue.split("-");
    var year = parseInt(bits[0], 10);
    var month = parseInt(bits[1], 10);
    var day = parseInt(bits[2], 10);
    var index = sunSignIndex(month, day);
    if (!year || !month || !day || index < 0) {
      result.appendChild(el("p", "That date did not read properly. Please try again."));
      return;
    }

    var sun = SIGNS[index];
    var place = (form.place.value || "").trim();
    var timeValue = form.birthtime.value;
    var rising = null;
    if (timeValue !== "unknown" && place) {
      rising = SIGNS[(index + risingOffset(timeValue)) % 12];
    }
    var metalSign = rising || sun;

    result.appendChild(el("h2", "Here is what we would send"));
    result.appendChild(el("p",
      "From " + day + " " + MONTHS[month - 1] + " " + year +
      " we make the sun sign " + sun.name +
      ". The sun can change sign a day either side of these dates, depending on the year. We use one set of newspaper dates for everybody."
    ));
    result.appendChild(el("p", "Crystal: " + sun.stoneName + ". " + sun.stoneWhy));

    var stoneImg = document.createElement("img");
    stoneImg.src = "images/" + sun.stone + ".jpg";
    stoneImg.alt = sun.stoneName;
    result.appendChild(stoneImg);

    if (rising) {
      result.appendChild(el("p",
        "You put " + (TIME_LABELS[timeValue] || "a time") +
        ", and the place as " + place +
        ". We are not drawing a proper chart, and we do not look up the latitude. As a rough guess, the rising sign sits near the sun sign about 6 in the morning, and moves on one sign about every two hours. On that rough clock the rising sign comes out as " +
        rising.name + ". Take it as approximate."
      ));
    } else if (timeValue === "unknown" && !place) {
      result.appendChild(el("p", "The time is marked I don't know, and the place is blank, so we will not guess a rising sign. The metal comes from the sun sign's old ruler instead."));
    } else if (timeValue === "unknown") {
      result.appendChild(el("p", "The time is marked I don't know, so we will not guess a rising sign. We did read the place (" + place + "). The metal comes from the sun sign's old ruler instead."));
    } else {
      result.appendChild(el("p", "There is a time, but no town, so we will not guess a rising sign. The metal comes from the sun sign's old ruler instead."));
    }

    result.appendChild(el("p", "Metal: " + metalSign.metalName + ". " + metalSign.metalWhy));

    var metalImg = document.createElement("img");
    metalImg.src = "images/" + metalSign.metal + ".jpg";
    metalImg.alt = metalSign.metalName;
    result.appendChild(metalImg);

    var link = document.createElement("a");
    link.href = "order.html?crystal=" + encodeURIComponent(sun.stone) + "&metal=" + encodeURIComponent(metalSign.metal);
    link.textContent = "Go to the order form with " + sun.stoneName + " and " + metalSign.metalName;
    var linkP = document.createElement("p");
    linkP.appendChild(link);
    result.appendChild(linkP);

    result.tabIndex = -1;
    result.focus();
  });
}

function postShopForm(url, payload) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(payload)
  }).then(function (res) {
    return res.json().then(function (data) {
      var sent = res.ok && data && data.ok === true;
      return {
        ok: sent,
        error: (data && data.error) || "The message did not send. Please write to orders@mypersonalcrystal.com yourself."
      };
    }, function () {
      return {
        ok: false,
        error: "The message did not send. Please write to orders@mypersonalcrystal.com yourself."
      };
    });
  }, function () {
    return {
      ok: false,
      error: "The message did not send. Please write to orders@mypersonalcrystal.com yourself."
    };
  });
}

function showFormError(thanks, message) {
  clearNode(thanks);
  thanks.hidden = false;
  thanks.appendChild(el("h2", "Sorry"));
  thanks.appendChild(el("p", message));
}

function initOrder() {
  var form = document.getElementById("order-form");
  var thanks = document.getElementById("thanks");
  var note = document.getElementById("prefill-note");
  if (!form || !thanks) return;

  var params = queryParams();
  var crystalOk = setSelect(form.crystal, params.crystal);
  var metalOk = setSelect(form.metal, params.metal);
  if (note && (params.crystal || params.metal)) {
    note.hidden = false;
    if (crystalOk || metalOk) {
      note.textContent = "The survey sent you here. We have filled in the crystal and the metal where they matched. Change them if that is wrong.";
    } else {
      note.textContent = "The link had a choice we could not match. Please pick from the lists.";
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.crystal.value || !form.metal.value) {
      showFormError(thanks, "Please choose a crystal and a metal.");
      return;
    }

    var crystalText = form.crystal.options[form.crystal.selectedIndex].text;
    var metalText = form.metal.options[form.metal.selectedIndex].text;
    var noteText = form.note.value.trim();
    var payload = {
      fullname: form.fullname.value.trim(),
      email: form.email.value.trim(),
      address: form.address.value.trim(),
      country: form.country.value.trim(),
      crystal: form.crystal.value,
      metal: form.metal.value,
      note: noteText
    };
    var button = form.querySelector("button[type=submit]");
    button.disabled = true;
    clearNode(thanks);
    thanks.hidden = false;
    thanks.appendChild(el("p", "Sending…"));

    postShopForm("/api/order", payload).then(function (result) {
      button.disabled = false;
      if (!result.ok) {
        showFormError(thanks, result.error);
        return;
      }

      var address = el("p", "Postal address: " + payload.address);
      address.style.whiteSpace = "pre-wrap";
      clearNode(thanks);
      thanks.hidden = false;
      thanks.appendChild(el("h2", "Thank you"));
      thanks.appendChild(el("p", "Thank you, " + payload.fullname + ". We sent this order to orders@mypersonalcrystal.com."));
      thanks.appendChild(el("p", "Name: " + payload.fullname));
      thanks.appendChild(el("p", "Email: " + payload.email));
      thanks.appendChild(address);
      thanks.appendChild(el("p", "Country: " + payload.country));
      thanks.appendChild(el("p", "Crystal: " + crystalText));
      thanks.appendChild(el("p", "Metal: " + metalText));
      thanks.appendChild(el("p", "Note: " + (noteText || "(none)")));
      thanks.appendChild(el("p", "To pay: postage, worked out from the weight and the country, plus a flat customising fee of NZ$15."));
      form.hidden = true;
      thanks.tabIndex = -1;
      thanks.focus();
    });
  });
}

function initContact() {
  var form = document.getElementById("contact-form");
  var thanks = document.getElementById("thanks");
  if (!form || !thanks) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var payload = {
      fullname: form.fullname.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim()
    };
    var button = form.querySelector("button[type=submit]");
    button.disabled = true;
    clearNode(thanks);
    thanks.hidden = false;
    thanks.appendChild(el("p", "Sending…"));

    postShopForm("/api/contact", payload).then(function (result) {
      button.disabled = false;
      if (!result.ok) {
        showFormError(thanks, result.error);
        return;
      }

      var message = el("p", payload.message);
      message.style.whiteSpace = "pre-wrap";
      clearNode(thanks);
      thanks.hidden = false;
      thanks.appendChild(el("h2", "Thank you"));
      thanks.appendChild(el("p", "Thank you, " + payload.fullname + ". We sent this to orders@mypersonalcrystal.com."));
      thanks.appendChild(el("p", "Name: " + payload.fullname));
      thanks.appendChild(el("p", "Email: " + payload.email));
      thanks.appendChild(el("p", "Message:"));
      thanks.appendChild(message);
      form.hidden = true;
      thanks.tabIndex = -1;
      thanks.focus();
    });
  });
}

initSurvey();
initOrder();
initContact();
