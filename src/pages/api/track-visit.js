export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const {
      USOURCE,
      UMEDIUM,
      utm_campaign,
      utm_ad_group,
      utm_term,
      utm_device,
      utm_gclid,
      utm_placement,
      utm_ad_name,
    } = req.body;

    const input = {
      rep_id: "sanjeet@raiseinfra.in",
      channel_id: "Website_Visit", // Distinguish from 'Enquire_Now'
      subject: "UTM Visit Capture",
      f_name: "Website",
      l_name: "Visitor",
      email: "", // Empty as this is just a visit
      phonefax: "", // Empty as this is just a visit
      notes: "Website visit with UTM parameters",
      project: "The Chimes",
      alert_client: 0,
      alert_rep: 0,
      USOURCE: USOURCE || "",
      UMEDIUM: UMEDIUM || "",
      utm_campaign: utm_campaign || "",
      utm_ad_group: utm_ad_group || "",
      utm_term: utm_term || "",
      utm_device: utm_device || "",
      utm_gclid: utm_gclid || "",
      utm_placement: utm_placement || "",
      utm_ad_name: utm_ad_name || "",
    };

    const apiKey = process.env.PARAMANTRA_API_KEY;
    const appName = process.env.PARAMANTRA_APP_NAME;

    // Log for debugging
    console.log("Tracking Visit:", { ...input, apiKey: "***", appName: "***" });

    const response = await fetch(
      "https://cloud.paramantra.com/paramantra/api/data/new/format/json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-API-KEY": apiKey,
          "ACTION-ON": appName,
          Authorization: `Basic ${Buffer.from(apiKey + ":").toString("base64")}`,
        },
        body: new URLSearchParams(input).toString(),
      },
    );

    const data = await response.json();

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("CRM Track Visit Error:", error);
    return res.status(500).json({ success: false, message: "Tracking Failed" });
  }
}
