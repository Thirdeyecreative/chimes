export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, phone } = req.body;

    const input = {
      rep_id: "sanjeet@raiseinfra.in",
      channel_id: "Enquire_Now",
      subject: "Lead from Website",
      f_name: name,
      l_name: "",
      email: email,
      phonefax: phone,
      notes: "Website enquiry for The Chimes project",
      project: "The Chimes",
      alert_client: 0,
      alert_rep: 0,
    };

    const apiKey = process.env.PARAMANTRA_API_KEY;
    const appName = process.env.PARAMANTRA_APP_NAME;

    console.log({ name, email, phone, apiKey, appName });

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
    console.error("CRM Error:", error);
    return res.status(500).json({ success: false, message: "CRM Failed" });
  }
}
