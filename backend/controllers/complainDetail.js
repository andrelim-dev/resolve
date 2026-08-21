import supabase from "../supabase.js";

export const complainDetail = async (req, res) => {
    try {
        const { id } = req.params;

        // Ambil data complaint
        const { data: complaint, error: complaintError } = await supabase
            .from("complain")
            .select("name, category, generate_at, number, status, description")
            .eq("id_complain", id)
            .single();

        // Ambil attachment berdasarkan id_complain
        const { data: attachments, error: attachmentError } = await supabase
            .from("attachment")
            .select("*")
            .eq("id_complain", id);

        if (attachmentError) {
            console.error(attachmentError);

            return res.status(500).json({
                message: "Gagal mengambil attachment",
                error: attachmentError.message
            });
        }

        // Generate CPM Code
        const cpmCode =
            `CPM-${complaint.generate_at.replaceAll("-", "")}-${String(
                complaint.number
            ).padStart(3, "0")}`;

        return res.status(200).json({
            message: "Detail complaint berhasil diambil",

            data: {
                ...complaint,
                cpm_code: cpmCode,
                attachments
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};