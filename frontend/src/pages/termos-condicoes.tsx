import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermosCondicoes() {
  return (
    <>
      <Head>
        <title>Termos e Condições | Camera Real</title>
        <meta name=&quot;description&quot; content=&quot;Termos e Condições de uso da plataforma Camera Real.&quot; />
      </Head>

      <div className=&quot;min-h-screen flex flex-col bg-black text-white&quot;>
        <Header />
        
        <main className=&quot;flex-1 py-12&quot;>
          <div className=&quot;container mx-auto px-4 max-w-4xl&quot;>
            <h1 className=&quot;text-4xl font-bold mb-8 text-center&quot;>Termos e <span className=&quot;text-[#F25790]&quot;>Condições</span></h1>
            
            <div className=&quot;prose prose-lg prose-invert max-w-none&quot;>
              <p className=&quot;text-gray-300&quot;>
                Última atualização: 24 de maio de 2025
              </p>
              
              <p>
                Bem-vindo(a) à Camera Real. Estes Termos e Condições (&quot;Termos&quot;) regem seu acesso e uso do site, 
                serviços, aplicativos e ferramentas da Camera Real (coletivamente, os &quot;Serviços&quot;).
              </p>
              
              <p>
                Ao acessar ou usar nossos Serviços, você concorda com estes Termos. Se você não concordar 
                com estes Termos, por favor, não acesse ou use nossos Serviços.
              </p>
              
              <h2 className=&quot;text-2xl font-bold mt-8 mb-4 text-[#F25790]&quot;>1. Elegibilidade</h2>
              
              <p>
                Para usar nossos Serviços, você deve ter pelo menos 18 anos de idade ou a maioridade legal 
                em sua jurisdição, o que for maior. Ao criar uma conta e usar nossos Serviços, você declara 
                e garante que:
              </p>
              <ul className=&quot;list-disc pl-6 mb-4 space-y-2&quot;>
                <li>Tem pelo menos 18 anos de idade</li>
                <li>Tem capacidade legal para aceitar estes Termos</li>
                <li>Não está proibido por lei de usar nossos Serviços</li>
                <li>Fornecerá informações precisas e verdadeiras durante o registro</li>
              </ul>
              
              <h2 className=&quot;text-2xl font-bold mt-8 mb-4 text-[#F25790]&quot;>2. Contas de Usuário</h2>
              
              <p>
                Ao criar uma conta na Camera Real, você é responsável por manter a segurança de sua conta 
                e senha. Você concorda em notificar-nos imediatamente sobre qualquer uso não autorizado 
                de sua conta ou qualquer outra violação de segurança.
              </p>
              <p>
                Você é responsável por todas as atividades que ocorrem sob sua conta. A Camera Real não 
                será responsável por quaisquer perdas ou danos resultantes de sua falha em cumprir com 
                as obrigações de segurança mencionadas acima.
              </p>
              
              <h2 className=&quot;text-2xl font-bold mt-8 mb-4 text-[#F25790]&quot;>3. Conteúdo do Usuário</h2>
              
              <h3 className=&quot;text-xl font-bold mt-6 mb-3&quot;>3.1 Propriedade e Licença</h3>
              <p>
                Você retém todos os direitos de propriedade sobre o conteúdo que você publica, carrega, 
                envia ou transmite para ou através de nossos Serviços (&quot;Conteúdo do Usuário&quot;). Ao enviar 
                Conteúdo do Usuário para nossos Serviços, você concede à Camera Real uma licença mundial, 
                não exclusiva, isenta de royalties, transferível e sublicenciável para usar, reproduzir, 
                distribuir, preparar trabalhos derivados, exibir e executar o Conteúdo do Usuário em 
                conexão com nossos Serviços.
              </p>
              
              <h3 className=&quot;text-xl font-bold mt-6 mb-3&quot;>3.2 Conteúdo Proibido</h3>
              <p>
                Você concorda em não publicar, carregar, enviar ou transmitir qualquer Conteúdo do Usuário 
                que:
              </p>
              <ul className=&quot;list-disc pl-6 mb-4 space-y-2&quot;>
                <li>Seja ilegal, prejudicial, ameaçador, abusivo, assediante, difamatório, vulgar, obsceno ou de outra forma censurável</li>
                <li>Viole os direitos de propriedade intelectual de terceiros</li>
                <li>Promova atividades ilegais ou condutas que sejam abusivas, ameaçadoras, obscenas, difamatórias ou caluniosas</li>
                <li>Retrate ou explore menores de idade</li>
                <li>Promova violência ou discriminação com base em raça, sexo, religião, nacionalidade, deficiência, orientação sexual ou idade</li>
                <li>Viole qualquer lei ou regulamento aplicável</li>
              </ul>
              
              <h2 className=&quot;text-2xl font-bold mt-8 mb-4 text-[#F25790]&quot;>4. Pagamentos e Créditos</h2>
              
              <p>
                A Camera Real oferece serviços premium que requerem pagamento. Ao fazer uma compra, você 
                concorda em pagar todos os valores especificados, incluindo quaisquer impostos aplicáveis.
              </p>
              <p>
                Os créditos adquiridos são válidos por 90 dias a partir da data de compra. Os créditos não 
                utilizados expirarão após esse período e não serão reembolsáveis.
              </p>
              <p>
                Todas as vendas são finais. Reembolsos podem ser concedidos apenas em circunstâncias 
                excepcionais, a critério exclusivo da Camera Real.
              </p>
              
              <h2 className=&quot;text-2xl font-bold mt-8 mb-4 text-[#F25790]&quot;>5. Termos para Modelos</h2>
              
              <p>
                Se você se registrar como modelo na Camera Real, concorda com os seguintes termos adicionais:
              </p>
              <ul className=&quot;list-disc pl-6 mb-4 space-y-2&quot;>
                <li>Fornecerá documentação válida que comprove sua identidade e idade</li>
                <li>Receberá pagamentos de acordo com a programação definida em seu contrato</li>
                <li>Não participará de atividades proibidas durante as transmissões</li>
                <li>Manterá a confidencialidade das informações dos usuários</li>
                <li>Cumprirá todas as leis e regulamentos aplicáveis</li>
              </ul>
              
              <h2 className=&quot;text-2xl font-bold mt-8 mb-4 text-[#F25790]&quot;>6. Conduta do Usuário</h2>
              
              <p>
                Ao usar nossos Serviços, você concorda em:
              </p>
              <ul className=&quot;list-disc pl-6 mb-4 space-y-2&quot;>
                <li>Não violar nenhuma lei ou regulamento aplicável</li>
                <li>Não interferir ou interromper o funcionamento de nossos Serviços</li>
                <li>Não tentar acessar áreas restritas de nossos Serviços</li>
                <li>Não contornar medidas de segurança ou limitações de acesso</li>
                <li>Não assediar, intimidar ou ameaçar outros usuários</li>
                <li>Não usar nossos Serviços para fins ilegais ou não autorizados</li>
              </ul>
              
              <h2 className=&quot;text-2xl font-bold mt-8 mb-4 text-[#F25790]&quot;>7. Propriedade Intelectual</h2>
              
              <p>
                Todos os direitos, títulos e interesses em e para os Serviços, incluindo todo o conteúdo, 
                designs, textos, gráficos, imagens, dados, software e outros arquivos, e a seleção e 
                arranjo deles, são de propriedade da Camera Real ou de seus licenciadores.
              </p>
              <p>
                Você não deve reproduzir, modificar, criar trabalhos derivados, distribuir, licenciar, 
                alugar, vender, revender, transferir, exibir publicamente, apresentar publicamente, 
                transmitir, transmitir ou explorar os Serviços, exceto conforme expressamente permitido 
                por estes Termos.
              </p>
              
              <h2 className=&quot;text-2xl font-bold mt-8 mb-4 text-[#F25790]&quot;>8. Limitação de Responsabilidade</h2>
              
              <p>
                Na medida máxima permitida pela lei aplicável, a Camera Real não será responsável por 
                quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo, 
                sem limitação, perda de lucros, dados, uso, boa vontade ou outras perdas intangíveis, 
                resultantes de:
              </p>
              <ul className=&quot;list-disc pl-6 mb-4 space-y-2&quot;>
                <li>Seu acesso ou uso ou incapacidade de acessar ou usar os Serviços</li>
                <li>Qualquer conduta ou conteúdo de terceiros nos Serviços</li>
                <li>Qualquer conteúdo obtido dos Serviços</li>
                <li>Acesso não autorizado, uso ou alteração de suas transmissões ou conteúdo</li>
              </ul>
              
              <h2 className=&quot;text-2xl font-bold mt-8 mb-4 text-[#F25790]&quot;>9. Modificações dos Termos</h2>
              
              <p>
                Reservamo-nos o direito de modificar estes Termos a qualquer momento. Se fizermos alterações 
                materiais, notificaremos você através de nosso site ou por e-mail. O uso contínuo de nossos 
                Serviços após tais alterações constitui sua aceitação dos novos Termos.
              </p>
              
              <h2 className=&quot;text-2xl font-bold mt-8 mb-4 text-[#F25790]&quot;>10. Lei Aplicável</h2>
              
              <p>
                Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, 
                independentemente de seus princípios de conflito de leis.
              </p>
              
              <h2 className=&quot;text-2xl font-bold mt-8 mb-4 text-[#F25790]&quot;>11. Contato</h2>
              
              <p>
                Se você tiver dúvidas sobre estes Termos, entre em contato conosco em:
              </p>
              <p className=&quot;mb-8&quot;>
                <strong>E-mail:</strong> termos@camera-real.com.br
              </p>
              
              <div className=&quot;mt-12 mb-8 text-center&quot;>
                <Link href=&quot;/politica-privacidade&quot; className=&quot;text-[#F25790] hover:underline&quot;>
                  Política de Privacidade
                </Link>
                {' | '}
                <Link href=&quot;/suporte&quot; className=&quot;text-[#F25790] hover:underline&quot;>
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
