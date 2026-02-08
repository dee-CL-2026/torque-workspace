const data = {
  watchlist: [
    {
      title: "Can You Keep a Secret",
      type: "TV",
      platform: "TBC",
      addedBy: "Sinead",
      rating: "TBC",
      notes: "Dawn French — spotted on Graham Norton",
      audience: "adults",
    },
    {
      title: "Chris Pratt movie (TBC)",
      type: "Film",
      platform: "TBC",
      addedBy: "Sinead",
      rating: "TBC",
      notes: "Spotted on Graham Norton",
      audience: "adults",
    },
    {
      title: "The Thing with Feathers",
      type: "Film",
      platform: "UK cinemas",
      addedBy: "Sinead",
      rating: "15+",
      notes: "Benedict Cumberbatch — grief drama",
      audience: "adults",
    },
    {
      title: "Ballad of a Small Player",
      type: "Film",
      platform: "Netflix",
      addedBy: "Sinead",
      rating: "18+",
      notes: "Colin Farrell, Tilda Swinton",
      audience: "adults",
    },
    {
      title: "The Traitors",
      type: "TV",
      platform: "BBC iPlayer",
      addedBy: "Sinead",
      rating: "All",
      notes: "Claudia Winkleman — social deduction",
      audience: "family",
    },
  ],
  readingList: [
    {
      title: "Ancient Egypt: Treasures of the Nile",
      type: "Book",
      owner: "Sinead",
      notes: "Weekend read — research for fun",
      audience: "adults",
    },
    {
      title: "Big Nate (Vol. 3)",
      type: "Book",
      owner: "Connie",
      notes: "Funny + quick read",
      audience: "kids",
    },
    {
      title: "The Wild Robot",
      type: "Book",
      owner: "Family",
      notes: "Bedtime candidate",
      audience: "family",
    },
  ],
  activities: [
    {
      title: "Mini soccer",
      day: "Tuesday",
      who: "Dee",
      notes: "Regular weekly",
      audience: "adults",
    },
    {
      title: "Padel night",
      day: "Thursday",
      who: "Dee",
      notes: "Regular weekly",
      audience: "adults",
    },
    {
      title: "Swimming practice",
      day: "Saturday",
      who: "Connie",
      notes: "High energy day",
      audience: "kids",
    },
    {
      title: "Family movie night",
      day: "Sunday",
      who: "Family",
      notes: "Pick from watchlist",
      audience: "family",
    },
  ],
  chatGateway: {
    email: "kids@torque.family (placeholder)",
    rules: [
      "All messages logged for parents",
      "No external email addresses allowed",
      "Quiet hours: 20:00–07:00",
    ],
    fallback: "If gateway is offline, send via WhatsApp family group.",
  },
};

const filterButtons = document.querySelectorAll(".filter-btn");
const activeFilterLabel = document.getElementById("activeFilterLabel");
const visibleCount = document.getElementById("visibleCount");

const watchlistContainer = document.getElementById("watchlistItems");
const readingContainer = document.getElementById("readingItems");
const activityContainer = document.getElementById("activityItems");
const chatGatewayContainer = document.getElementById("chatGateway");

const audienceMatch = (itemAudience, filter) => {
  if (filter === "all") return true;
  if (itemAudience === "family") return true;
  return itemAudience === filter;
};

const renderList = (items, container, templateFn, filter) => {
  container.innerHTML = "";
  const filtered = items.filter((item) => audienceMatch(item.audience, filter));
  filtered.forEach((item) => container.appendChild(templateFn(item)));
  return filtered.length;
};

const buildItem = (title, metaLines, tagLabel) => {
  const wrapper = document.createElement("div");
  wrapper.className = "item";

  const heading = document.createElement("h3");
  heading.textContent = title;

  const meta = document.createElement("div");
  meta.className = "item-meta";
  metaLines.forEach((line) => {
    const span = document.createElement("span");
    span.textContent = line;
    meta.appendChild(span);
  });

  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = tagLabel;

  wrapper.appendChild(heading);
  wrapper.appendChild(tag);
  wrapper.appendChild(meta);
  return wrapper;
};

const renderChatGateway = () => {
  chatGatewayContainer.innerHTML = "";
  const card = document.createElement("div");
  card.className = "chat-card";

  const email = document.createElement("div");
  email.className = "field";
  email.innerHTML = `<strong>${data.chatGateway.email}</strong><span>Gateway address</span>`;

  const rules = document.createElement("div");
  rules.className = "field";
  rules.innerHTML = `<strong>Guardrails</strong><span>${data.chatGateway.rules.join(" · ")}</span>`;

  const fallback = document.createElement("div");
  fallback.className = "field";
  fallback.innerHTML = `<strong>Fallback</strong><span>${data.chatGateway.fallback}</span>`;

  card.appendChild(email);
  card.appendChild(rules);
  card.appendChild(fallback);
  chatGatewayContainer.appendChild(card);
};

const renderAll = (filter = "all") => {
  const watchCount = renderList(
    data.watchlist,
    watchlistContainer,
    (item) =>
      buildItem(
        item.title,
        [
          `${item.type} • ${item.platform}`,
          `Added by ${item.addedBy} • Rating ${item.rating}`,
          item.notes,
        ],
        item.audience.toUpperCase()
      ),
    filter
  );

  const readingCount = renderList(
    data.readingList,
    readingContainer,
    (item) =>
      buildItem(
        item.title,
        [`${item.type} • ${item.owner}`, item.notes],
        item.audience.toUpperCase()
      ),
    filter
  );

  const activityCount = renderList(
    data.activities,
    activityContainer,
    (item) =>
      buildItem(
        item.title,
        [`${item.day} • ${item.who}`, item.notes],
        item.audience.toUpperCase()
      ),
    filter
  );

  renderChatGateway();
  activeFilterLabel.textContent = filter === "all" ? "All" : filter;
  visibleCount.textContent = watchCount + readingCount + activityCount;
};

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderAll(btn.dataset.filter);
  });
});

renderAll();
