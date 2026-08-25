"use client";
import Image from "next/image";

export default function SponsorsSection() {
  const platinumSponsors = [
    { name: "Volkswagen", src: "/sponsers/platinum01.png" },
  ];

  const goldSponsors = [
    { name: "Balsamiq", src: "/sponsers/gold01.png" },
    { name: "Postman", src: "/sponsers/gold02.png" },
  ];

  const silverSponsors = [
    { name: "Slack", src: "/sponsers/silver01.png" },
    { name: "McDonald's", src: "/sponsers/silver02.png" },
    { name: "Docker", src: "/sponsers/silver03.png" },
  ];

  return (
    <section
      id="sponsors"
      style={{
        background: "#080808",
        padding: "90px 24px",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
        {/* Section Tag */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            marginBottom: "14px",
          }}
        >
          <div style={{ width: "6px", height: "6px", backgroundColor: "#FF6000", borderRadius: "50%", boxShadow: "0 0 8px #FF6000" }} />
          <span
            style={{
              fontSize: "12px",
              color: "#FF6000",
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            OUR PARTNERS
          </span>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontSize: "clamp(30px, 4.5vw, 48px)",
            fontWeight: 800,
            letterSpacing: "-0.5px",
            lineHeight: 1.2,
            marginBottom: "16px",
          }}
        >
          <span style={{ color: "#ffffff" }}>Building the </span>
          <span style={{ color: "#22C55E" }}>Future</span>
          <br />
          <span style={{ color: "#ffffff" }}>with Amazing </span>
          <span style={{ color: "#FF6000" }}>Partners</span>
        </h2>

        <p
          style={{
            color: "#9ca3af",
            fontSize: "15px",
            lineHeight: 1.6,
            marginBottom: "48px",
            maxWidth: "520px",
            margin: "0 auto 48px",
          }}
        >
          We are proud to be supported by industry leaders who believe in the power of open source in India.
        </p>

        {/* Main Sponsors Showcase Container */}
        <div
          style={{
            background: "#0d0d0d",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "6px",
            padding: "48px 32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "40px",
          }}
        >
          {/* Platinum Tier */}
          <div style={{ width: "100%" }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#e5e7eb",
                letterSpacing: "1.2px",
                marginBottom: "20px",
              }}
            >
              Platinum Sponsors
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
              {platinumSponsors.map((s, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    width: "200px",
                    height: "84px",
                    borderRadius: "4px",
                    overflow: "hidden",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "8px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.3)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.1)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <Image
                    src={s.src}
                    alt={s.name}
                    fill
                    sizes="200px"
                    style={{ objectFit: "contain", padding: "8px" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Gold Tier */}
          <div style={{ width: "100%" }}>
            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#FF6000",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Gold Sponsors
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              {goldSponsors.map((s, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    width: "160px",
                    height: "64px",
                    borderRadius: "4px",
                    overflow: "hidden",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "6px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 96, 0, 0.4)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.08)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <Image
                    src={s.src}
                    alt={s.name}
                    fill
                    sizes="160px"
                    style={{ objectFit: "contain", padding: "6px" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Silver Tier */}
          <div style={{ width: "100%" }}>
            <div
              style={{
                fontSize: "11.5px",
                fontWeight: 700,
                color: "#9ca3af",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              Silver Sponsors
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
              {silverSponsors.map((s, i) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    width: "140px",
                    height: "54px",
                    borderRadius: "4px",
                    overflow: "hidden",
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "6px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.2)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255, 255, 255, 0.06)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <Image
                    src={s.src}
                    alt={s.name}
                    fill
                    sizes="140px"
                    style={{ objectFit: "contain", padding: "6px" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
