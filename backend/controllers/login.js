import supabase from '../supabase.js';

export const login = async (req, res) => {

    try {
        
        const { email, password } = req.body;

        // Validasi input
        if (!email || !password) {
            return res.status(400).json({
                message: "Email dan Password wajib diisi"
            });
        }

        // Cari user
        const { data, error } = await supabase
            .from('staff')
            .select('*')
            .eq('email', email)
            .eq('password', password);

        if (error) {
            return res.status(500).json(error);
        }

        // Tidak ditemukan
        if (data.length === 0) {
            return res.status(401).json({
                message: "Email atau Password salah"
            });
        }

        // Login berhasil
        res.status(200).json({
            message: "Login berhasil",
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

}