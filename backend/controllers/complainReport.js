import supabase from "../supabase.js";

export const complainReport = async (req, res) => {
    try {
        const { type, year, month } = req.body;

        // =========================
        // VALIDASI
        // =========================

        if (!type) {
            return res.status(400).json({
                message: "Parameter type wajib diisi (monthly / yearly)"
            });
        }

        if (!["monthly", "yearly"].includes(type)) {
            return res.status(400).json({
                message: "type harus monthly atau yearly"
            });
        }

        if (!year) {
            return res.status(400).json({
                message: "Parameter year wajib diisi"
            });
        }

        const yearNumber = Number(year);

        if (!Number.isInteger(yearNumber)) {
            return res.status(400).json({
                message: "Year tidak valid"
            });
        }

        // =========================
        // TENTUKAN PERIODE
        // =========================

        let startDate;
        let endDate;
        let period;

        if (type === "monthly") {
            if (!month) {
                return res.status(400).json({
                    message: "Parameter month wajib diisi untuk monthly report"
                });
            }

            const monthNumber = Number(month);

            if (
                !Number.isInteger(monthNumber) ||
                monthNumber < 1 ||
                monthNumber > 12
            ) {
                return res.status(400).json({
                    message: "Month harus antara 1 sampai 12"
                });
            }

            startDate =
                `${yearNumber}-${String(monthNumber).padStart(2, "0")}-01`;

            endDate =
                monthNumber === 12
                    ? `${yearNumber + 1}-01-01`
                    : `${yearNumber}-${String(monthNumber + 1).padStart(2, "0")}-01`;

            const date = new Date(yearNumber, monthNumber - 1, 1);

            period = date.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric"
            });

        } else {
            // YEARLY

            startDate = `${yearNumber}-01-01`;
            endDate = `${yearNumber + 1}-01-01`;

            period = String(yearNumber);
        }

        // =========================
        // AMBIL DATA COMPLAINT
        // =========================

        const { data, error } = await supabase
            .from("complain")
            .select("category, status, generate_at")
            .neq("status", "draft")
            .gte("generate_at", startDate)
            .lt("generate_at", endDate);

        if (error) {
            console.error(error);

            return res.status(500).json({
                message: "Gagal mengambil report complaint",
                error: error.message
            });
        }

        // =========================
        // STATISTIK
        // =========================

        const summary = {
            total: 0,
            completed: 0,
            processed: 0,
            pending: 0
        };

        const categoryMap = {
            "Billing Issue": {
                category: "Billing Issue",
                shortLabel: "Bill",
                total: 0,
                completed: 0,
                processed: 0,
                pending: 0,
                color: "#2563eb"
            },

            "Technical Problem": {
                category: "Technical Problem",
                shortLabel: "Tech",
                total: 0,
                completed: 0,
                processed: 0,
                pending: 0,
                color: "#f97316"
            },

            "Product Defect": {
                category: "Product Defect",
                shortLabel: "Prod",
                total: 0,
                completed: 0,
                processed: 0,
                pending: 0,
                color: "#8b5cf6"
            },

            "Service Quality": {
                category: "Service Quality",
                shortLabel: "Serv",
                total: 0,
                completed: 0,
                processed: 0,
                pending: 0,
                color: "#10b981"
            },

            "Other": {
                category: "Other",
                shortLabel: "Other",
                total: 0,
                completed: 0,
                processed: 0,
                pending: 0,
                color: "#64748b"
            }
        };

        // =========================
        // HITUNG DATA
        // =========================

        data.forEach((complaint) => {
            const category = complaint.category;
            const status = complaint.status;

            // Total
            summary.total++;

            // Status global
            if (status === "Completed") {
                summary.completed++;
            } else if (status === "Processed") {
                summary.processed++;
            } else if (status === "Pending") {
                summary.pending++;
            }

            // Category
            if (categoryMap[category]) {
                categoryMap[category].total++;

                if (status === "Completed") {
                    categoryMap[category].completed++;
                } else if (status === "Processed") {
                    categoryMap[category].processed++;
                } else if (status === "Pending") {
                    categoryMap[category].pending++;
                }
            }
        });

        // =========================
        // UBAH OBJECT → ARRAY
        // =========================

        const categories = Object.values(categoryMap);

        // =========================
        // RESPONSE
        // =========================

        return res.status(200).json({
            message: "Report complaint berhasil dibuat",

            data: {
                type,
                period,

                generatedAt: new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }),

                summary,

                categories
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};