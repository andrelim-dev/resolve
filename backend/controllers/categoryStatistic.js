import supabase from "../supabase.js";

export const categoryStatistics = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("complain")
            .select("category");

        if (error) {
            return res.status(500).json({
                message: "Gagal mengambil statistik",
                error: error.message
            });
        }

        const statistics = {
            billing_issue: 0,
            technical_problem: 0,
            product_defect: 0,
            service_quality: 0,
            other: 0,
        };

        data.forEach((complaint) => {
            if (complaint.category === "Billing Issue") {
                statistics.billing_issue++;
            } else if (complaint.category === "Technical Problem") {
                statistics.technical_problem++;
            } else if (complaint.category === "Product Defect") {
                statistics.product_defect++;
            } else if (complaint.category === "Service Quality") {
                statistics.service_quality++;
            } else if (complaint.category === "Other") {
                statistics.other++;
            }
        });

        return res.status(200).json({
            message: "Statistik complaint berhasil diambil",
            data: { statistics }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};