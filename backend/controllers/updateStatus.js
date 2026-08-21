import supabase from "../supabase.js";

export const updateComplainStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatus = ["Pending", "Processed", "Completed"];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Status tidak valid"
            });
        }

        const updateData = {
            status
        };

        if (status === "Processed") {
            updateData.processing_at = new Date().toISOString();
        }

        if (status === "Completed") {
            updateData.completed_at = new Date().toISOString();
        }

        const { data, error } = await supabase
            .from("complain")
            .update(updateData)
            .eq("id_complain", id)
            .select()
            .single();

        if (error) {
            console.error(error);

            return res.status(500).json({
                message: "Gagal mengupdate status complaint",
                error: error.message
            });
        }

        return res.status(200).json({
            message: "Status complaint berhasil diupdate",
            data
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};