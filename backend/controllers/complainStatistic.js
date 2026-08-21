import supabase from "../supabase.js";

export const complaintStatistics = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("complain")
            .select("status");

        if (error) {
            return res.status(500).json({
                message: "Gagal mengambil statistik",
                error: error.message
            });
        }

        const statistics = {
            complete: 0,
            pending: 0,
            process: 0
        };

        data.forEach((complaint) => {
            const status = complaint.status?.trim().toLowerCase();
            if (status === "completed") {
                statistics.complete++;
            } else if (status === "pending") {
                statistics.pending++;
            } else if (status === "processed") {
                statistics.process++;
            }
        });

        const totalStatistics = statistics.complete + statistics.pending + statistics.process;

        return res.status(200).json({
            message: "Statistik complaint berhasil diambil",
            data: { statistics, total: totalStatistics }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};