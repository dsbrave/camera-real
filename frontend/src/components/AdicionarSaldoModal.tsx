import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface AdicionarSaldoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCredits: (amount: number) => void;
}

// Lista de imagens de pessoas/casais
const personImages = [
  'realistic_photo_of_a_brazilian_latino_man_with_everyday_natural_looks__regular_including_body_diver_vs7hdhw8kb2k3781yud7_0.png',
  'realistic_photo_of_a_brazilian_latino_man_with_everyday_natural_looks__regular_including_body_diver_t9ds118vumcosaizpbp9_1.png',
  'realistic_photo_of_a_brazilian_latino_man_with_everyday_natural_looks__regular_including_body_diver_p7ar5lkjso28dlubnh91_3.png',
  'realistic_photo_of_a_brazilian_latino_man_with_everyday_natural_looks__regular_including_body_diver_grh48wi4e7hixbjkk83y_0.png',
  'realistic_photo_of_a_brazilian_latino_man_with_everyday_natural_looks__regular_including_body_diver_gpi5hzbcmrpn97id2f2o_1.png',
  'realistic_photo_of_a_brazilian_latino_man_with_everyday_natural_looks__regular_including_body_diver_gfia9q2y3y4nvbu1q3v3_3.png',
  'realistic_photo_of_a_brazilian_latino_man_with_everyday_natural_looks__regular_including_body_diver_f82w9fzqwnpgmui0ykql_3.png',
  'realistic_photo_of_a_brazilian_latino_man_with_everyday_natural_looks__regular_including_body_diver_ecf9z2bp6ac4zulo1fmw_3.png',
  'realistic_photo_of_a_brazilian_latino_man_with_everyday_natural_looks__regular_including_body_diver_bk3xzapp8bfl1f6z0o1a_0.png',
  'realistic_photo_of_a_brazilian_latino_man_with_everyday_natural_looks__regular_including_body_diver_ahdu5rvu1ocli3txwuq6_1.png',
  'realistic_photo_of_a_brazilian_latino_man_with_everyday_natural_looks__regular_including_body_diver_778w36i33rm7v0ucdebe_2.png',
  'realistic_photo_of_a_brazilian_latino_man_with_everyday_natural_looks__regular_including_body_diver_57c32r6blmkzgrl282d1_1.png',
  'realistic_photo_of_a_brazilian_latino_man_with_everyday_natural_looks__regular_including_body_diver_3vt6d0mtv7762tdzfqxl_1.png',
  'realistic_photo_of_a_brazilian_latino_man_with_everyday_natural_looks__regular_including_body_diver_36s35tv87993zid2c30w_0.png',
  'realistic_photo_of_a_brazilian_latino_girl_with_everyday_natural_looks__regular_including_body_dive_hplk4qbeg2n1f554pbe2_3.png',
  'realistic_photo_of_a_beautiful_curvy_cam_model_with_a_seductive_figure_in_sexy_casual_clothing_slig_ahfgqgjmowqgy07bfw5r_0.png',
  'realistic_photo_of_a_beautiful_curvy_cam_model_in_sexy_casual_clothing_in_a_pink_neon-lit_cam_studi_01vxr9sv9u5n1mi8vknf_2.png',
  'realistic_photo_of_a_beautiful_curvy_cam_model_in_sexy_casual_clothing_crouching_down_seductively_t_amu04kgiucz3eokekwrk_1.png',
  'realistic_photo_of_a_beautiful_curvy_cam_model_in_sexy_casual_clothing_crouching_down_seductively_t_3cztx1xhqyc4ka3r2sxm_77.png',
  'realistic_photo_of_a_beautiful_curvy_cam_model_in_sexy_casual_clothing_crouching_down_seductively_t_02y5lhog5fhudntrltmb_72.png',
  'high-resolution_studio_photo_of_a_confident_brazilian-inspired_model_wearing_an_elegant_black_lace__xju79gu63twrr4y7wwl6_0.png',
  'high-resolution_studio_photo_of_a_confident_brazilian-inspired_model_wearing_an_elegant_black_lace__x9vtp00ka5z57ni5ff16_2.png',
  'high-resolution_studio_photo_of_a_confident_brazilian-inspired_model_wearing_an_elegant_black_lace__qxnhg17arbpzwvqdae8r_1.png',
  'high-resolution_studio_photo_of_a_confident_brazilian-inspired_model_wearing_an_elegant_black_lace__jenlm3m0nq2zupzowhbw_0.png',
  'high-resolution_studio_photo_of_a_confident_brazilian-inspired_model_wearing_an_elegant_black_lace__i7mo7j07sng27o0fv86l_2.png',
  'high-resolution_studio_photo_of_a_confident_brazilian-inspired_model_wearing_an_elegant_black_lace__h8m9h8h9dqaxjx9830c8_3.png',
  'high-resolution_studio_photo_of_a_confident_brazilian-inspired_model_wearing_an_elegant_black_lace__fpsds5tbwq17taxrj9z7_1.png',
  'high-resolution_studio_photo_of_a_confident_brazilian-inspired_model_wearing_an_elegant_black_lace__8a6pzrxtrdwlhrhnixvv_2.png',
  'high-resolution_studio_photo_of_a_confident_brazilian-inspired_model_wearing_an_elegant_black_lace__7dk5gpng4zpsbx1iryyw_2.png',
  'high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_zg1iy2w7g4x4j2pm3925_0.png',
  'high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_r68jd84c1uv21o2ehzgj_3.png',
  'high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_ko2t9z7547m30wzu3dsv_1.png',
  'high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_jdasqbio3vvca5k92ebh_2.png',
  'high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_hgg1km82rvo2tgmhd39a_3.png',
  'high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_bwiwj44iuhfpxz2tlzha_1.png',
  'high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_8dcmfx9cfacmkla3y56r_3.png',
  'high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_6mvzae1eh6jnb7qk229u_1.png',
  'high-quality_studio_photo_of_a_fit_female_model_posing_in_a_modern_streaming_setup_emphasis_on_body_2wu5n7gdr6dsrmj98ak9_2.png',
  'high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_zogrxbsso7f5cot9iywg_3.png',
  'high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_xcuvvf5mb98aiguyg0ar_3.png',
  'high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_qhcvmpojebov1lic1cwu_0.png',
  'high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_pbqy208mxdxlbokwwd6m_1.png',
  'high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_mfy2q53wmccvq4vr70pj_2.png',
  'high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_lpgby79k4yffkuwn2krb_1.png',
  'high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_lj67e4yfxtz8scvdmb5m_0.png',
  'high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_l1g01p6hm0p1kyxw2q42_0.png',
  'high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_f67xs5lbbv739ikqn0z5_3.png',
  'high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_6xmeh5hwdbulnwsdojt2_3.png',
  'high-quality_fashion_studio_photo_of_a_fit_brazilian-inspired_model_in_a_streaming_room_setup_the_m_02dvig8rzo34w5lc3f29_3.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_real-life_people__mvalhy6pmm5d5gtmmoo5_5.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_real-life_people__g0v6am9iamjk8trwz703_7.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_real-life_people__d001oi95qd5y4hgmbjl1_1.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_real-life_couple__yzpt8m2o1ep19v8vqmmc_0.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_real-life_couple__g9ob4ri5atk6c4shyur9_3.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_real-life_couple__bs962q3mvl17gobqp182_3.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_lesbian_real-life_yxymlf6mxr7fz3lj72c2_0.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_lesbian_real-life_ywl5rbewnur5zwcu1br6_0.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_lesbian_real-life_y39jar0nuzgizqc0ahvo_1.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_lesbian_real-life_wgbd0rqv3tymedhq2dvo_3.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_lesbian_real-life_lq4u513chjx1rlabljif_1.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_lesbian_real-life_adnz598z6d4nby3dxytx_2.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_lesbian_real-life_1mzezut8941nc74bxkxu_2.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_beauty_real-life__wi4ecukg5q3clcziptks_0.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_beauty_real-life__tuqx4h29gu7wo0b1fr92_3.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_beauty_real-life__qqozz0eh0t6kl5qtbxf3_2.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_beauty_real-life__moncday4zsrdyqywgduu_6.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_beauty_real-life__dbbqxwipp7do92wlwl7d_3.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_beauty_real-life__cd6lq4r3sp44ox2d43bc_3.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_beauty_real-life__b3uv0efkhgp35404n7ab_0.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_beauty_real-life__6nmg5b7w3nb3t0kvzai9_0.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_beauty_real-life__1op4a0atw1sp76eq2w12_1.png',
  'realistic_photo_of_a_brazilian_latino_couple_with_everyday_natural_looks__regular_beauty_real-life__1h0iyptgff93k49h6bf8_3.png',
];

const AdicionarSaldoModal: React.FC<AdicionarSaldoModalProps> = ({
  isOpen,
  onClose,
  onAddCredits,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [randomImage, setRandomImage] = useState<string>('');

  const handleSelectAmount = (amount: number) => {
    setSelectedAmount(amount);
  };

  const handleAdvance = () => {
    if (selectedAmount) {
      onAddCredits(selectedAmount);
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Sorteia uma imagem diferente da anterior, se possível
      setRandomImage(prev => {
        if (personImages.length <= 1) return personImages[0];
        let idx = Math.floor(Math.random() * personImages.length);
        // Evita repetir a mesma imagem se possível
        while (personImages[idx] === prev && personImages.length > 1) {
          idx = Math.floor(Math.random() * personImages.length);
        }
        return personImages[idx];
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const creditOptions = [
    { value: 10, label: 'R$ 10' },
    { value: 30, label: 'R$ 30' },
    { value: 50, label: 'R$ 50' },
    { value: 100, label: 'R$ 100' },
    { value: 150, label: 'R$ 150' },
    { value: 300, label: 'R$ 300' },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-xl relative max-h-[90vh] overflow-y-auto p-8">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row items-center">
          {/* Left side - Illustration */}
          <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
            <div className="relative h-48 w-48">
              <Image 
                src={`/images/${randomImage}`}
                alt="Pessoa ou casal"
                width={200}
                height={200}
                className="object-contain rounded-xl"
                priority
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="md:w-2/3 md:pl-8">
            <h2 className="text-2xl font-bold text-white mb-2 text-center md:text-left">Adicionar saldo</h2>
            <p className="text-white mb-6 text-center md:text-left">Selecione um valor para adicionar à sua conta:</p>

            {/* Credit options grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {creditOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelectAmount(option.value)}
                  className={
                    `rounded-lg py-3 px-4 text-center transition-all ` +
                    (selectedAmount === option.value 
                      ? 'bg-white text-[#F25790] font-bold border-2 border-[#F25790]' 
                      : 'bg-[#8d41a8]/50 text-white hover:bg-[#8d41a8] border border-transparent')
                  }
                >
                  <div className="text-base font-medium">Carregue</div>
                  <div className={`text-xl ${selectedAmount === option.value ? 'font-bold' : 'font-semibold'}`}>
                    {option.label}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleAdvance}
              disabled={!selectedAmount}
              className="w-full py-3 bg-gradient-to-r from-[#F25790] to-[#d93d75] text-white font-bold rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(242,87,144,0.4)] hover:shadow-[0_0_25px_rgba(242,87,144,0.6)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Avançar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdicionarSaldoModal;
