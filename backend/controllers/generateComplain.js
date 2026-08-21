import supabase from "../supabase.js";

export const generateComplain = async (req, res) => {
    try {
        const now = new Date();
        const generateAt = now.toISOString().split("T")[0];

        // Cari nomor terakhir pada hari ini
        const { data: lastComplaint, error: lastError } =
            await supabase
                .from("complain")
                .select("number")
                .eq("generate_at", generateAt)
                .order("number", { ascending: false })
                .limit(1);

        if (lastError) {
            console.error("LAST COMPLAINT ERROR:", lastError);

            return res.status(500).json({
                message: "Gagal mendapatkan nomor CMP",
                error: lastError.message
            });
        }

        const number =
            lastComplaint && lastComplaint.length > 0
                ? Number(lastComplaint[0].number) + 1
                : 1;

        // Insert draft complaint
        const { data, error } = await supabase
            .from("complain")
            .insert({
                number,
                generate_at: generateAt,
                status: "draft"
            })
            .select(
                "id_complain, number, generate_at, status"
            )
            .single();

        if (error) {
            console.error("INSERT COMPLAINT ERROR:", error);

            // Duplicate number
            if (error.code === "23505") {
                return res.status(409).json({
                    message:
                        "Nomor ticket sedang dibuat oleh request lain. Silakan coba lagi."
                });
            }

            return res.status(500).json({
                message: "Gagal generate CMP",
                error: error.message
            });
        }

        const CMPCode =
            `CMP-${generateAt.replaceAll("-", "")}-${String(
                number
            ).padStart(3, "0")}`;

        return res.status(201).json({
            message: "CMP berhasil dibuat",

            data: {
                id_complain: data.id_complain,
                CMP_code: CMPCode,
                number: data.number,
                generate_at: data.generate_at,
                status: data.status
            }
        });

    } catch (error) {
        console.error(
            "GENERATE COMPLAINT ERROR:",
            error
        );

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};