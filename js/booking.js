// Sea Star Villa — booking widget
// Computes a live quote from the villa's published seasonal rates, enforces
// minimum stays, and hands off to email or Airbnb with the dates attached.

(function () {
  "use strict";

  var AIRBNB_URL = "https://www.airbnb.com/rooms/9380578";
  var BOOKING_EMAIL = "reservations@seastarjamaica.com";
  var MAX_GUESTS = 12;

  // Published rates: summer Apr 15 – Dec 14 ($1,500/night, 2-night min),
  // winter Dec 15 – Apr 14 ($1,700/night, 2-night min), and the holiday week
  // Dec 25 – Jan 1 ($13,000 for 7 nights, 7-night min).
  var HOLIDAY_WEEK_TOTAL = 13000;

  function nightInfo(date) {
    var m = date.getMonth() + 1;
    var d = date.getDate();
    if (m === 12 && d >= 25) {
      return { season: "Christmas & New Year's", rate: HOLIDAY_WEEK_TOTAL / 7 };
    }
    var afterApr15 = m > 4 || (m === 4 && d >= 15);
    var beforeDec15 = m < 12 || (m === 12 && d <= 14);
    if (afterApr15 && beforeDec15) {
      return { season: "Summer season", rate: 1500 };
    }
    return { season: "Winter season", rate: 1700 };
  }

  var form = document.getElementById("booking-form");
  if (!form) return;

  var arrivalEl = document.getElementById("bk-arrival");
  var departureEl = document.getElementById("bk-departure");
  var guestsEl = document.getElementById("bk-guests");
  var quoteEl = document.getElementById("bk-quote");
  var linesEl = document.getElementById("bk-quote-lines");
  var totalEl = document.getElementById("bk-quote-total");
  var errorEl = document.getElementById("bk-error");
  var submitEl = document.getElementById("bk-submit");
  var airbnbEl = document.getElementById("bk-airbnb");

  // No past dates
  var today = new Date();
  var isoToday = toISO(today);
  arrivalEl.min = isoToday;
  departureEl.min = isoToday;

  function toISO(d) {
    return d.getFullYear() + "-" +
      String(d.getMonth() + 1).padStart(2, "0") + "-" +
      String(d.getDate()).padStart(2, "0");
  }

  function parseISO(s) {
    if (!s) return null;
    var p = s.split("-");
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }

  function money(n) {
    return "$" + Math.round(n).toLocaleString("en-US") + " USD";
  }

  function computeQuote(arrival, departure) {
    var seasons = {}; // name -> { nights, amount }
    var order = [];
    var total = 0;
    var holiday = false;
    for (var d = new Date(arrival); d < departure; d.setDate(d.getDate() + 1)) {
      var info = nightInfo(d);
      if (info.season.indexOf("Christmas") === 0) holiday = true;
      if (!seasons[info.season]) {
        seasons[info.season] = { nights: 0, amount: 0, rate: info.rate };
        order.push(info.season);
      }
      seasons[info.season].nights += 1;
      seasons[info.season].amount += info.rate;
      total += info.rate;
    }
    return {
      nights: Math.round((departure - arrival) / 86400000),
      seasons: seasons,
      order: order,
      total: total,
      minStay: holiday ? 7 : 2
    };
  }

  function setError(msg) {
    errorEl.textContent = msg;
    errorEl.hidden = !msg;
    quoteEl.hidden = !!msg;
    submitEl.disabled = !!msg;
  }

  function update() {
    var arrival = parseISO(arrivalEl.value);
    var departure = parseISO(departureEl.value);

    // Keep departure min one day past arrival, and the Airbnb link in sync
    if (arrival) {
      var nextDay = new Date(arrival);
      nextDay.setDate(nextDay.getDate() + 1);
      departureEl.min = toISO(nextDay);
    }
    var url = AIRBNB_URL;
    if (arrival && departure && departure > arrival) {
      url += "?check_in=" + arrivalEl.value + "&check_out=" + departureEl.value +
        "&adults=" + (parseInt(guestsEl.value, 10) || 1);
    }
    airbnbEl.href = url;

    if (!arrival || !departure) {
      quoteEl.hidden = true;
      errorEl.hidden = true;
      submitEl.disabled = false;
      return;
    }
    if (departure <= arrival) {
      setError("Departure must be after arrival.");
      return;
    }

    var quote = computeQuote(arrival, departure);
    if (quote.nights < quote.minStay) {
      setError(
        quote.minStay === 7
          ? "Stays over Christmas & New Year's (Dec 25 – Jan 1) have a 7-night minimum."
          : "We have a 2-night minimum stay."
      );
      return;
    }

    var guests = parseInt(guestsEl.value, 10) || 0;
    if (guests > MAX_GUESTS) {
      setError("The villa sleeps up to " + MAX_GUESTS + " guests.");
      return;
    }

    setError("");
    linesEl.innerHTML = "";
    quote.order.forEach(function (name) {
      var s = quote.seasons[name];
      var li = document.createElement("li");
      var label = name.indexOf("Christmas") === 0
        ? name + " · " + s.nights + (s.nights === 1 ? " night" : " nights")
        : name + " · " + s.nights + (s.nights === 1 ? " night" : " nights") +
          " × " + money(s.rate).replace(" USD", "");
      var spanLabel = document.createElement("span");
      spanLabel.textContent = label;
      var spanAmt = document.createElement("span");
      spanAmt.textContent = money(s.amount).replace(" USD", "");
      li.appendChild(spanLabel);
      li.appendChild(spanAmt);
      linesEl.appendChild(li);
    });
    totalEl.textContent = money(quote.total) + " · " + quote.nights + " nights";
    quoteEl.hidden = false;
  }

  ["change", "input"].forEach(function (evt) {
    arrivalEl.addEventListener(evt, update);
    departureEl.addEventListener(evt, update);
    guestsEl.addEventListener(evt, update);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementById("bk-name").value.trim();
    var email = document.getElementById("bk-email").value.trim();
    if (!arrivalEl.value || !departureEl.value) {
      setError("Please choose your arrival and departure dates.");
      return;
    }
    if (!name || !email) {
      setError("Please add your name and email so we can reply.");
      return;
    }
    update();
    if (submitEl.disabled) return;

    var arrival = parseISO(arrivalEl.value);
    var departure = parseISO(departureEl.value);
    var quote = computeQuote(arrival, departure);
    var message = document.getElementById("bk-message").value.trim();

    var subject = "Booking enquiry: " + arrivalEl.value + " to " + departureEl.value;
    var body =
      "Hello Sea Star Villa,\n\n" +
      "I'd like to book the villa.\n\n" +
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Arrival: " + arrivalEl.value + "\n" +
      "Departure: " + departureEl.value + " (" + quote.nights + " nights)\n" +
      "Guests: " + (guestsEl.value || "-") + "\n" +
      "Estimated total: " + money(quote.total) + "\n" +
      (message ? "\n" + message + "\n" : "") +
      "\nThank you!";

    window.location.href = "mailto:" + BOOKING_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  });
})();
