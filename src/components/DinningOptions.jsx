// components/DiningOptions.js

export default function DiningOptions() {
  const diningSpots = [
    {
      name: "The Lagoon Grill",
      description:
        "Enjoy fresh seafood, grilled specialties, and refreshing cocktails with a stunning view of the lagoon. Perfect for relaxing lunches or sunset dinners.",
      style: "Casual, Poolside Dining",
      icon: "🍤",
    },
    {
      name: "The Orchard Restaurant",
      description:
        "Experience elegant, farm-to-table cuisine featuring seasonal menus and expertly paired wines. Ideal for romantic dinners and special occasions.",
      style: "Fine Dining with a View",
      icon: "🍷",
    },
    {
      name: "Café Sol",
      description:
        "Stop by for artisanal coffee, fresh pastries, and healthy snacks. Cozy ambiance perfect for breakfast or a quick afternoon recharge.",
      style: "Light Meals & Coffee",
      icon: "☕",
    },
    {
      name: "Beach Bar & Lounge",
      description:
        "Sip tropical cocktails and enjoy light tapas while listening to live music by the beach. The ultimate spot to unwind after a day of adventure.",
      style: "Chill & Refresh",
      icon: "🍹",
    },
  ];

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-green-900 mb-4 drop-shadow-sm">
          Dining Options
        </h2>
        <p className="text-green-800 max-w-3xl mx-auto text-lg leading-relaxed">
          Discover a culinary journey at Novu Resort. From casual bites to
          gourmet meals, savor fresh, locally sourced flavors in stunning
          settings.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-2">
        {diningSpots.map(({ name, description, style, icon }) => (
          <div
            key={name}
            className="flex flex-col md:flex-row items-center bg-green-50 rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-500 p-8"
          >
            <div className="flex-shrink-0 text-6xl mr-8 text-green-700 animate-bounce">
              <span aria-label={name} role="img">
                {icon}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-green-900 mb-2">
                {name}
              </h3>
              <p className="text-green-700 italic mb-3">{style}</p>
              <p className="text-green-800 leading-relaxed">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button className="bg-green-900 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-green-800 transition">
          Reserve Your Table Now
        </button>
      </div>
    </section>
  );
}
