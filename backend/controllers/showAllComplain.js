import supabase from "../supabase.js";

export const showAllComplain = async (req, res) => {
    try {
        const { data: complaints, error } = await supabase
            .from("complain")
            .select(`
                id_complain,
                name,
                category,
                generate_at,
                number,
                status,
                attachments (
                    id_complain,
                    file
                )
            `)
            .neq("status", "draft")
            .order("generate_at", { ascending: false })
            .order("number", { ascending: false });

        if (error) {
            console.error("SHOW ALL COMPLAIN ERROR:", error);

            return res.status(500).json({
                message: "Gagal mengambil data complaint",
                error: error.message
            });
        }

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
            data: result,
            total: result.length
        });

    } catch (error) {
        console.error("SHOW ALL COMPLAIN ERROR:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};