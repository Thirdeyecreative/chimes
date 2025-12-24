function NearbyHighlights() {
  return (
    <section className="nearby-highlights">
      {/* CARD 1 */}
      <div className="nearby-highlights-card">
        {/* Mobile Image */}

        <img
          className="max-w-[100px] max-h-[100px] m-auto block md:hidden"
          src="assets/nearby-highlights-image-3.webp"
          alt=""
        />

        <h3>WIPRO</h3>

        {/* Desktop Image */}

        <img
          className="max-w-[150px] max-h-[150px] m-auto hidden md:block"
          src="assets/nearby-highlights-image-3.webp"
          alt=""
        />

        <p>
          A global tech powerhouse and innovation hub, keeping you connected to
          Bengaluru’s <br /> thriving IT ecosystem
        </p>

        <h4>15 Minutes Away</h4>
      </div>

      {/* CARD 2 */}
      <div className="nearby-highlights-card">
        {/* Mobile Image */}
        <img
          className="max-w-[100px] max-h-[100px] m-auto block md:hidden"
          src="assets/nearby-highlights-image-2.webp"
          alt=""
        />

        <h3>WORLD-CLASS EDUCATION</h3>

        {/* Desktop Image */}
        <img
          className="max-w-[150px] max-h-[150px] transform scale-150 m-auto hidden md:block"
          src="assets/nearby-highlights-image-2.webp"
          alt=""
        />

        <p>
          Surrounded by top international schools such as TISB, Oakridge,
          Greenwood High and Indus International.
        </p>
        <h4>20 Minutes Away</h4>
      </div>

      {/* CARD 3 */}
      <div className="nearby-highlights-card">
        {/* Mobile Image */}
        <img
          className="max-w-[100px] max-h-[100px] m-auto block md:hidden"
          src="assets/nearby-highlights-image-1.webp"
          alt=""
        />
        <h3>PRESTIGE CITY</h3>

        {/* Desktop Image */}
        <img
          className="max-w-[150px] max-h-[150px] m-auto hidden md:block"
          src="assets/nearby-highlights-image-1.webp"
          alt=""
        />

        <p>
          A landmark township offering luxury residences, retail, and leisure
          spaces, bringing urban convenience to your doorstep
        </p>

        <h4>9 Minutes Away</h4>
      </div>
    </section>
  );
}

export default NearbyHighlights;
