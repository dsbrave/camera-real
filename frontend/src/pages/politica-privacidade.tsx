import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PoliticaPrivacidade() {
  return (
    <>
      <Head>
        <title>Política de Privacidade | Camera Real</title>
        <meta name="description" content="Política de Privacidade da Camera Real. Saiba como tratamos seus dados pessoais." />
      </Head>

      <div className="min-h-screen flex flex-col bg-black text-white">
        <Header />
        
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-center">Política de <span className="text-[#F25790]">Privacidade</span></h1>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-300">
                Última atualização: 24 de maio de 2025
              </p>
              
              <p>
                A Camera Real está comprometida em proteger sua privacidade. Esta Política de Privacidade 
                explica como coletamos, usamos, divulgamos e protegemos suas informações pessoais quando 
                você utiliza nosso site e serviços.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 text-[#F25790]">1. Informações que Coletamos</h2>
              
              <h3 className="text-xl font-bold mt-6 mb-3">1.1 Informações Pessoais</h3>
              <p>
                Coletamos informações que você nos fornece diretamente quando:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Cria uma conta em nossa plataforma</li>
                <li>Preenche formulários em nosso site</li>
                <li>Realiza transações financeiras</li>
                <li>Participa de chats ou videochamadas</li>
                <li>Entra em contato com nosso suporte</li>
              </ul>
              <p>
                Essas informações podem incluir seu nome, endereço de e-mail, data de nascimento, 
                informações de pagamento e, no caso de modelos, documentos de identificação.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">1.2 Informações Coletadas Automaticamente</h3>
              <p>
                Quando você usa nosso site, coletamos automaticamente certos dados, incluindo:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Endereço IP e informações do dispositivo</li>
                <li>Tipo de navegador e sistema operacional</li>
                <li>Páginas visitadas e tempo gasto no site</li>
                <li>Informações sobre como você interage com nosso site</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 text-[#F25790]">2. Como Usamos Suas Informações</h2>
              
              <p>Usamos as informações que coletamos para:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Fornecer, manter e melhorar nossos serviços</li>
                <li>Processar transações e enviar informações relacionadas</li>
                <li>Enviar comunicações administrativas</li>
                <li>Personalizar sua experiência em nosso site</li>
                <li>Verificar identidade e prevenir fraudes</li>
                <li>Cumprir obrigações legais</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 text-[#F25790]">3. Compartilhamento de Informações</h2>
              
              <p>
                Podemos compartilhar suas informações pessoais nas seguintes circunstâncias:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Com fornecedores de serviços que nos ajudam a operar nosso site</li>
                <li>Com processadores de pagamento para completar transações</li>
                <li>Quando necessário para cumprir leis ou regulamentos aplicáveis</li>
                <li>Para proteger direitos, propriedade ou segurança da Camera Real, nossos usuários ou o público</li>
              </ul>
              <p>
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros 
                para fins de marketing sem seu consentimento explícito.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 text-[#F25790]">4. Segurança de Dados</h2>
              
              <p>
                Implementamos medidas de segurança técnicas, administrativas e físicas projetadas 
                para proteger suas informações pessoais contra acesso não autorizado ou ilegal e 
                contra perda, destruição ou dano acidental.
              </p>
              <p>
                Apesar de nossos esforços, nenhum método de transmissão pela Internet ou método 
                de armazenamento eletrônico é 100% seguro. Portanto, não podemos garantir a 
                segurança absoluta de suas informações.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 text-[#F25790]">5. Seus Direitos</h2>
              
              <p>Dependendo da sua localização, você pode ter os seguintes direitos:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Acessar as informações pessoais que temos sobre você</li>
                <li>Corrigir informações imprecisas ou incompletas</li>
                <li>Excluir suas informações pessoais</li>
                <li>Restringir ou opor-se ao processamento de suas informações</li>
                <li>Receber uma cópia de suas informações em formato portátil</li>
                <li>Retirar seu consentimento a qualquer momento</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 text-[#F25790]">6. Cookies e Tecnologias Semelhantes</h2>
              
              <p>
                Usamos cookies e tecnologias semelhantes para coletar informações sobre suas atividades 
                em nosso site, lembrar suas preferências e personalizar sua experiência. Você pode 
                gerenciar suas preferências de cookies através das configurações do seu navegador.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 text-[#F25790]">7. Privacidade de Crianças</h2>
              
              <p>
                Nossos serviços não são destinados a menores de 18 anos. Não coletamos conscientemente 
                informações pessoais de crianças. Se você acredita que coletamos informações de uma 
                criança, entre em contato conosco imediatamente.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 text-[#F25790]">8. Alterações a Esta Política</h2>
              
              <p>
                Podemos atualizar esta Política de Privacidade de tempos em tempos para refletir mudanças 
                em nossas práticas ou por outros motivos operacionais, legais ou regulatórios. Notificaremos 
                você sobre quaisquer alterações significativas através de um aviso em nosso site ou por e-mail.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4 text-[#F25790]">9. Contato</h2>
              
              <p>
                Se você tiver dúvidas, preocupações ou solicitações relacionadas a esta Política de Privacidade 
                ou ao processamento de suas informações pessoais, entre em contato conosco em:
              </p>
              <p className="mb-8">
                <strong>E-mail:</strong> privacidade@camera-real.com.br
              </p>
              
              <div className="mt-12 mb-8 text-center">
                <Link href="/termos-condicoes" className="text-[#F25790] hover:underline">
                  Termos e Condições
                </Link>
                {' | '}
                <Link href="/suporte" className="text-[#F25790] hover:underline">
                  Entre em Contato
                </Link>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
