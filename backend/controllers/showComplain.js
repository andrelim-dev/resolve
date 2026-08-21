import supabase from "../supabase.js";

export const showComplain = async (req, res) => {
    try {
        // Ambil 5 complaint terbaru
        const { data: complaints, error: complaintError } = await supabase
            .from("complain")
            .select("id_complain, name, category, generate_at, number, status")
            .neq("status", "draft")
            .order("generate_at", { ascending: false })
            .limit(5);

        if (complaintError) {
            console.error(complaintError);

            return res.status(500).json({
                message: "Gagal mengambil data complaint",
                error: complaintError.message
            });
        }

        // Generate CPM Code untuk setiap complaint
        const result = complaints.map((complaint) => {
            const cpmCode =
                `CPM-${complaint.generate_at.replaceAll("-", "")}-${String(
                    complaint.number
                ).padStart(3, "0")}`;

            return {
                ...complaint,
                cpm_code: cpmCode
            };
        });

        return res.status(200).json({
            data: result
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};