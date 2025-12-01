"use client";

import React, { useState, useRef } from "react";
import { 
  motion, 
  useScroll, 
  useSpring, 
  useMotionTemplate, 
  useMotionValue,
  useTransform,
  useInView,
  Variants,
  AnimatePresence
} from "framer-motion";
import { 
  ArrowRight, 
  Code2, 
  Globe, 
  Layout, 
  Terminal, 
  Zap, 
  MoveUpRight, 
  Check, 
  Copy, 
  Github, 
  Linkedin, 
  Twitter,
  X,
  Search,
  BarChart3,
  Rocket,
  MessageSquare,
  Calendar,
  FileText,
  Star,
  ChevronRight,
  Lock,
  Server,
  Activity,
  HeartPulse,
  Dumbbell,
  UtensilsCrossed,
  Smartphone,
  Users,
  Clock,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// --- COMPONENTES UI INTERNOS ---

// 1. FadeIn Wrapper & Stagger System
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerContainer = ({ children, className = "", delayChildren = 0 }: { children: React.ReactNode, className?: string, delayChildren?: number }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: { transition: { staggerChildren: 0.1, delayChildren } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// 2. Grid Background
const GridBackground = () => (
  <div className="fixed inset-0 z-[-1] pointer-events-none">
    <div className="absolute inset-0 bg-neutral-950"></div>
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full mix-blend-screen" />
    <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-purple-500/5 blur-[100px] rounded-full mix-blend-screen" />
  </div>
);

// 3. Spotlight Card
function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-neutral-800 bg-neutral-900/50 overflow-hidden rounded-xl ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.10),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

// 4. Tech Ticker
const TechTicker = () => {
  const techs = [
    "Next.js 15", "React Server Components", "TypeScript", "Tailwind CSS", 
    "Framer Motion", "PostgreSQL", "Prisma", "Stripe", "Shadcn UI", "Supabase", "Vercel"
  ];
  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_li]:text-neutral-500 [&_li]:font-medium [&_li]:text-xl animate-scroll">
        {[...techs, ...techs].map((tech, i) => (
          <li key={i} className="whitespace-nowrap">{tech}</li>
        ))}
      </ul>
    </div>
  );
};

// 5. Copy Email Button
const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);
  const email = "rafael.2006.matos@gmail.com"; 

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="group relative flex items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-6 py-4 transition-all hover:bg-neutral-800 active:scale-95"
    >
      <span className="text-neutral-300 font-medium">{copied ? "Email Copiado!" : "Copiar Email"}</span>
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-neutral-500 group-hover:text-white" />}
    </button>
  );
};

// 6. Methodology Modal
const MethodologyModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-[#0a0a0a] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/50">
              <div>
                <h3 className="text-xl font-bold text-white">Metodologia de Trabalho</h3>
                <p className="text-neutral-400 text-sm">O blueprint para o sucesso digital.</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-full transition-colors text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="overflow-y-auto p-8">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="relative pl-8 border-l border-neutral-800 pb-8 last:pb-0">
                    <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500 flex items-center justify-center text-xs font-bold text-indigo-400">1</span>
                    <h4 className="text-lg font-bold text-white mb-2">Discovery & Estratégia</h4>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                      Antes de escrever uma linha de código, mergulho no seu modelo de negócio. Analisamos concorrentes, definimos KPIs e criamos a arquitetura da informação.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-neutral-900 text-neutral-500">Benchmarking</Badge>
                      <Badge variant="secondary" className="bg-neutral-900 text-neutral-500">Wireframing</Badge>
                    </div>
                  </div>

                  <div className="relative pl-8 border-l border-neutral-800 pb-8 last:pb-0">
                    <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center text-xs font-bold text-blue-400">2</span>
                    <h4 className="text-lg font-bold text-white mb-2">Design UI/UX Premium</h4>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                      Crio interfaces que não são apenas bonitas, mas funcionais. Foco total na experiência do utilizador para maximizar a conversão.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-neutral-900 text-neutral-500">Figma</Badge>
                      <Badge variant="secondary" className="bg-neutral-900 text-neutral-500">Prototipagem</Badge>
                    </div>
                  </div>

                  <div className="relative pl-8 border-l border-neutral-800 pb-8 last:pb-0">
                    <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center text-xs font-bold text-purple-400">3</span>
                    <h4 className="text-lg font-bold text-white mb-2">Desenvolvimento Fullstack</h4>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                      Código limpo, escalável e seguro. Utilizo a stack mais moderna (Next.js) para garantir performance de ponta e SEO nativo.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-neutral-900 text-neutral-500">Next.js 14</Badge>
                      <Badge variant="secondary" className="bg-neutral-900 text-neutral-500">TypeScript</Badge>
                    </div>
                  </div>
                  
                  <div className="relative pl-8 border-l border-neutral-800">
                    <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center text-xs font-bold text-green-400">4</span>
                    <h4 className="text-lg font-bold text-white mb-2">Lançamento & Otimização</h4>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                      O trabalho não acaba no deploy. Monitorizo a performance, configuro analíticas e garanto que o site está indexado no Google.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-neutral-900 text-neutral-500">SEO</Badge>
                      <Badge variant="secondary" className="bg-neutral-900 text-neutral-500">Analytics</Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800 flex flex-col justify-between">
                   <div>
                     <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                       <Cpu className="w-5 h-5 text-indigo-500" /> Stack Tecnológica
                     </h4>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-black rounded-lg border border-neutral-800">
                           <div className="text-xs text-neutral-500 mb-1">Frontend</div>
                           <div className="text-white font-medium">React, Next.js, Tailwind</div>
                        </div>
                        <div className="p-3 bg-black rounded-lg border border-neutral-800">
                           <div className="text-xs text-neutral-500 mb-1">Backend</div>
                           <div className="text-white font-medium">Node.js, Postgres, Supabase</div>
                        </div>
                        <div className="p-3 bg-black rounded-lg border border-neutral-800">
                           <div className="text-xs text-neutral-500 mb-1">CMS (Opcional)</div>
                           <div className="text-white font-medium">Sanity, Strapi, Shopify</div>
                        </div>
                        <div className="p-3 bg-black rounded-lg border border-neutral-800">
                           <div className="text-xs text-neutral-500 mb-1">Infra</div>
                           <div className="text-white font-medium">Vercel, AWS, Docker</div>
                        </div>
                     </div>
                   </div>
                   
                   <div className="mt-8 pt-8 border-t border-neutral-800">
                      <div className="text-center">
                        <p className="text-neutral-400 text-sm mb-4">Pronto para começar?</p>
                        <Button className="w-full bg-white text-black hover:bg-neutral-200 font-bold" onClick={onClose}>
                          Agendar Reunião Inicial
                        </Button>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// 7. Navbar
const Navbar = () => (
  <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
    <div className="flex items-center gap-6 rounded-full border border-white/10 bg-black/50 backdrop-blur-md px-6 py-3 shadow-2xl">
      <Link href="/" className="font-bold text-white tracking-tight">InneraAI<span className="text-indigo-500">.</span></Link>
      <div className="h-4 w-px bg-white/10 hidden md:block"></div>
      <div className="hidden md:flex gap-6 text-sm font-medium text-neutral-400">
        <Link href="#work" className="hover:text-white transition-colors">Trabalho</Link>
        <Link href="#process" className="hover:text-white transition-colors">Processo</Link>
        <Link href="#testimonials" className="hover:text-white transition-colors">Clientes</Link>
      </div>
      <Button size="sm" className="rounded-full bg-white text-black hover:bg-neutral-200 font-semibold">
        Agendar
      </Button>
    </div>
  </nav>
);

// --- VISUAIS ABSTRATOS PARA PROJETOS PRIVADOS ---

// 1. Gluc4All Visual (Saúde & Dados)
const Gluc4AllVisual = () => (
  <div className="w-full h-full bg-neutral-900 relative overflow-hidden flex items-center justify-center">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),transparent_70%)]" />
    
    {/* Heartbeat Line Simulation */}
    <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <svg viewBox="0 0 500 100" className="w-full h-32 stroke-emerald-500 fill-none stroke-2">
            <motion.path
                d="M0 50 L100 50 L120 20 L140 80 L160 50 L200 50 L220 10 L240 90 L260 50 L500 50"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
            />
        </svg>
    </div>

    {/* Floating Data Card */}
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="relative z-10 w-64 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
    >
       <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold text-white">GLUCOSE LEVEL</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
       </div>
       <div className="space-y-1">
          <div className="text-3xl font-bold text-white">98 <span className="text-sm text-neutral-400 font-normal">mg/dL</span></div>
          <div className="text-xs text-emerald-400">Stable • Last reading: Now</div>
       </div>
       {/* Sync Status */}
       <div className="mt-4 flex items-center gap-2 text-[10px] text-neutral-500 uppercase tracking-wider border-t border-white/5 pt-2">
          <Activity className="w-3 h-3" /> Sensor Connected
       </div>
    </motion.div>
  </div>
);

// 2. Boavista Kickboxing Visual (Gestão & Performance)
const KickboxingVisual = () => (
  <div className="w-full h-full bg-neutral-950 p-6 flex flex-col justify-center relative overflow-hidden">
     {/* Abstract Rings */}
     <div className="absolute right-0 top-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl" />
     
     {/* Dashboard Elements */}
     <div className="grid grid-cols-2 gap-4 relative z-10">
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl"
        >
            <Users className="w-5 h-5 text-red-500 mb-2" />
            <div className="text-2xl font-bold text-white">142</div>
            <div className="text-xs text-neutral-500">Atletas Ativos</div>
        </motion.div>

        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl"
        >
            <Activity className="w-5 h-5 text-orange-500 mb-2" />
            <div className="text-2xl font-bold text-white">85%</div>
            <div className="text-xs text-neutral-500">Ocupação Aulas</div>
        </motion.div>

        <motion.div 
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="col-span-2 bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex items-center justify-between"
        >
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-bold text-xs">BK</div>
                <div className="space-y-1">
                    <div className="h-2 w-24 bg-neutral-800 rounded-full" />
                    <div className="h-2 w-16 bg-neutral-800 rounded-full" />
                </div>
            </div>
            <Badge className="bg-green-500/10 text-green-500 border-none">Pago</Badge>
        </motion.div>
     </div>
  </div>
);

// 3. OFerreira Visual (Reservas & Elegância)
const OFerreiraVisual = () => (
  <div className="w-full h-full bg-[#1c1c1c] p-6 flex flex-col items-center justify-center relative overflow-hidden">
     {/* Background Decor */}
     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
     <div className="absolute top-0 left-0 text-[8rem] font-serif font-bold text-amber-500/[0.03] leading-none select-none">
        MENU
     </div>
     
     {/* Reservation Card */}
     <motion.div 
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-64 bg-neutral-900 border border-amber-500/20 p-5 rounded-lg shadow-2xl relative z-10"
     >
        <div className="flex justify-between items-center mb-6">
            <UtensilsCrossed className="w-5 h-5 text-amber-500" />
            <span className="text-[10px] tracking-widest text-neutral-500 uppercase">Reserva Confirmada</span>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
            <div className="flex flex-col items-center justify-center w-12 h-12 bg-neutral-800 rounded-lg border border-neutral-700">
                <span className="text-xs text-neutral-500">OUT</span>
                <span className="text-lg font-bold text-white">24</span>
            </div>
            <div>
                <div className="text-white font-serif text-lg">Jantar Executivo</div>
                <div className="text-amber-500 text-xs flex items-center gap-1"><Clock className="w-3 h-3"/> 20:00 • Mesa 4</div>
            </div>
        </div>

        <div className="w-full bg-green-500/10 text-green-500 text-xs py-2 rounded flex items-center justify-center gap-2">
            <Check className="w-3 h-3" /> Notificação Enviada
        </div>
     </motion.div>
  </div>
);


// --- PÁGINA PRINCIPAL ---

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="relative min-h-screen text-neutral-50 selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* BACKGROUND ELEMENTS */}
      <GridBackground />
      <div className="bg-noise" />
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 origin-left z-[60]" />

      <Navbar />
      <MethodologyModal isOpen={isMethodologyOpen} onClose={() => setIsMethodologyOpen(false)} />

      <main>
        {/* --- HERO SECTION --- */}
        {/* CORREÇÃO 1: Adicionado pb-40 para evitar sobreposição dos botões e do ticker */}
        <section className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden pt-20 pb-40">
          
          <motion.div style={{ y, opacity }} className="z-10 text-center max-w-5xl space-y-8">
            <FadeIn>
                <div className="flex justify-center mt-5">
                    <Badge variant="outline" className="border-indigo-500/20 bg-indigo-500/10 text-indigo-300 px-4 py-1.5 rounded-full backdrop-blur-md gap-2">
                        <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        A aceitar novos projetos para Q4
                    </Badge>
                </div>
            </FadeIn>
            
            <FadeIn delay={0.1}>
                <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white leading-[0.9]">
                Não criamos apenas websites. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                    Criamos máquinas de vendas.
                </span>
                </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
                <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                Pare de perder clientes com um site lento e genérico. Usamos engenharia de software de elite para construir a sua vantagem competitiva.
                </p>
            </FadeIn>

            <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <Button size="lg" className="h-14 px-8 rounded-full bg-white text-black hover:bg-neutral-200 text-lg font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                    Ver Resultados
                </Button>
                <CopyEmailButton />
                </div>
            </FadeIn>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}
            className="absolute bottom-12 w-full max-w-screen-2xl mx-auto px-4 opacity-40 hover:opacity-100 transition-opacity duration-500"
          >
            <TechTicker />
          </motion.div>
        </section>

        {/* --- O CONFLITO --- */}
        <section id="problem" className="py-32 relative border-y border-neutral-800 bg-black/40 backdrop-blur-sm">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <FadeIn className="space-y-8">
                <Badge variant="outline" className="text-red-400 border-red-500/20 bg-red-500/10">A dura realidade</Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  O seu site atual está a <br/>
                  <span className="text-neutral-500">queimar dinheiro?</span>
                </h2>
                <p className="text-neutral-400 text-lg leading-relaxed">
                  A maioria das empresas ignora os fundamentos. Um site lento não é apenas "chato" — é invisível para o Google e repelente para clientes premium.
                </p>
                
                <StaggerContainer className="space-y-4">
                  {[
                    "40% dos utilizadores abandonam se demorar +3s a carregar.",
                    "Sem SEO técnico, você não existe na página 1 do Google.",
                    "Design amador transmite insegurança e baixa o valor percebido."
                  ].map((item, i) => (
                    <StaggerItem key={i} className="flex items-center gap-4 p-4 rounded-lg bg-neutral-900/50 border border-neutral-800 hover:border-red-500/30 transition-colors">
                      <div className="p-2 rounded-full bg-red-500/10 text-red-500">
                        <X className="w-4 h-4" />
                      </div>
                      <span className="text-neutral-300">{item}</span>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </FadeIn>

              {/* Visualização do "Caos" */}
              <FadeIn delay={0.2} className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-3xl rounded-full opacity-30" />
                <SpotlightCard className="p-8 border-red-500/20 bg-neutral-900/80">
                  <div className="flex items-center gap-4 mb-8 border-b border-neutral-800 pb-4">
                     <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-red-500/50 animate-pulse" />
                       <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                       <div className="w-3 h-3 rounded-full bg-green-500/50" />
                     </div>
                     <div className="ml-auto text-xs font-mono text-red-400">STATUS: CRITICAL FAILURE</div>
                  </div>
                  
                  <div className="space-y-4 opacity-50 grayscale blur-[1px]">
                     <div className="h-8 bg-neutral-800 rounded w-3/4" />
                     <div className="h-32 bg-neutral-800 rounded w-full" />
                     <div className="grid grid-cols-3 gap-4">
                        <div className="h-20 bg-neutral-800 rounded" />
                        <div className="h-20 bg-neutral-800 rounded" />
                        <div className="h-20 bg-neutral-800 rounded" />
                     </div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-6 py-3 rounded-full font-bold backdrop-blur-md rotate-12 shadow-2xl uppercase tracking-widest">
                      Oportunidades Perdidas
                    </div>
                  </div>
                </SpotlightCard>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* --- A SOLUÇÃO: WORK (ABSTRACT VISUALS) --- */}
        <section id="work" className="py-32 px-4 container mx-auto max-w-6xl">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                <Badge variant="outline" className="text-indigo-400 border-indigo-500/20 bg-indigo-500/10 mb-4">Portfolio</Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Projetos Reais, Impacto Real</h2>
                <p className="text-neutral-400 max-w-md text-lg">
                    Aplicações complexas traduzidas em experiências simples e lucrativas.
                </p>
                </div>
                <Button 
                  variant="ghost" 
                  className="text-neutral-400 hover:text-white group"
                  onClick={() => setIsMethodologyOpen(true)}
                >
                  Ver metodologia <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                </Button>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* PROJECT 1: GLUC4ALL (Saúde IoT) */}
            <StaggerItem className="col-span-1 md:col-span-2">
                {/* CORREÇÃO 2: Removido flex do SpotlightCard e adicionada div interna de wrapper para layout correto */}
                <SpotlightCard className="min-h-[500px] bg-neutral-900 border-neutral-800">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="p-10 flex flex-col justify-between w-full md:w-1/2 z-10 bg-neutral-900/50 backdrop-blur-sm">
                        <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <div className="text-emerald-400 font-mono text-sm tracking-widest uppercase">HealthTech IoT</div>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Gluc4All: Monitorização Vital</h3>
                        <p className="text-neutral-400 leading-relaxed mb-8 text-lg">
                            Plataforma de tracking médico com interação em tempo real com sensores glicémicos. Foco absoluto na precisão de dados e acessibilidade.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                          <div>
                              <div className="text-2xl font-bold text-white">&lt; 100ms</div>
                              <div className="text-xs text-neutral-500 uppercase tracking-wide">Sync Latency</div>
                          </div>
                          <div>
                              <div className="text-2xl font-bold text-white">WCAG 2.1</div>
                              <div className="text-xs text-neutral-500 uppercase tracking-wide">Acessibilidade AA</div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-8">
                            <Badge variant="secondary" className="bg-neutral-800 text-neutral-300">Web Bluetooth</Badge>
                            <Badge variant="secondary" className="bg-neutral-800 text-neutral-300">PWA</Badge>
                            <Badge variant="secondary" className="bg-neutral-800 text-neutral-300">Next.js</Badge>
                        </div>
                        </div>
                        <Link href="#" className="inline-flex items-center gap-2 text-white font-semibold hover:text-emerald-400 transition-colors group">
                        Ver Case Study IoT <MoveUpRight className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"/>
                        </Link>
                    </div>
                    
                    {/* Visual Abstrato */}
                    <div className="w-full md:w-1/2 min-h-[300px] md:h-full border-l border-neutral-800 relative">
                        <Gluc4AllVisual />
                    </div>
                  </div>
                </SpotlightCard>
            </StaggerItem>

            {/* PROJECT 2: BOAVISTA KICKBOXING (SaaS Gestão) */}
            <StaggerItem>
                <SpotlightCard className="min-h-[500px]">
                  {/* CORREÇÃO: Wrapper Flex Interno */}
                  <div className="flex flex-col h-full">
                    <div className="h-64 border-b border-neutral-800 relative bg-neutral-950">
                      <KickboxingVisual />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                        <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center mb-6 text-white border border-neutral-800">
                          <Dumbbell className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Boavista Kickboxing App</h3>
                        <p className="text-neutral-400 mb-auto leading-relaxed">
                        Software de gestão desportiva completo. Automatização de mensalidades, gestão de atletas e dashboards de performance em tempo real.
                        </p>
                        <div className="mt-8 pt-8 border-t border-neutral-800 flex justify-between items-center">
                        <div className="flex gap-2">
                            <Badge variant="outline" className="border-neutral-800 text-neutral-500">SaaS</Badge>
                            <Badge variant="outline" className="border-neutral-800 text-neutral-500">Stripe Connect</Badge>
                        </div>
                        <Link href="#" className="p-2 bg-white text-black rounded-full hover:scale-110 transition-transform"><ArrowRight className="w-4 h-4"/></Link>
                        </div>
                    </div>
                  </div>
                </SpotlightCard>
            </StaggerItem>

            {/* PROJECT 3: OFERREIRA (Hospitality) */}
            <StaggerItem>
                <SpotlightCard className="min-h-[500px]">
                  {/* CORREÇÃO: Wrapper Flex Interno */}
                  <div className="flex flex-col h-full">
                    <div className="h-64 border-b border-neutral-800 relative bg-[#1c1c1c]">
                        <OFerreiraVisual />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                        <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center mb-6 text-white border border-neutral-800">
                          <UtensilsCrossed className="w-6 h-6 text-amber-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">OFerreira: Reserva & Menu</h3>
                        <p className="text-neutral-400 mb-auto leading-relaxed">
                        Digitalização completa da experiência do restaurante. Menu interativo e sistema de reservas automático que eliminou os no-shows.
                        </p>
                        <div className="mt-8 pt-8 border-t border-neutral-800 flex justify-between items-center">
                        <div className="flex gap-2">
                            <Badge variant="outline" className="border-neutral-800 text-neutral-500">Automation</Badge>
                            <Badge variant="outline" className="border-neutral-800 text-neutral-500">SEO Local</Badge>
                        </div>
                        <Link href="#" className="p-2 bg-white text-black rounded-full hover:scale-110 transition-transform"><ArrowRight className="w-4 h-4"/></Link>
                        </div>
                    </div>
                  </div>
                </SpotlightCard>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* --- TESTEMUNHOS (Prova Social com Stagger) --- */}
        <section id="testimonials" className="py-20 border-t border-neutral-800 bg-neutral-900/20">
            <div className="container mx-auto px-4 max-w-6xl">
                <FadeIn>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
                        O que dizem os clientes
                    </h2>
                </FadeIn>

                <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { name: "Dr. André Costa", role: "Gluc4All Project", text: "A precisão dos dados em tempo real é crítica para nós. O sistema desenvolvido não falha. Transformou a vida dos nossos pacientes." },
                        { name: "Mestre Carlos", role: "Boavista Kickboxing", text: "Poupamos cerca de 20 horas por mês em tarefas administrativas. A aplicação paga-se a si mesma só com a retenção de atletas." },
                        { name: "Família Ferreira", role: "Restaurante OFerreira", text: "Desde que lançámos o novo site, as reservas automáticas aumentaram 40%. O menu digital é elogiado todos os dias." }
                    ].map((t, i) => (
                        <StaggerItem key={i}>
                            <SpotlightCard className="p-8 h-full bg-neutral-950 border-neutral-800">
                                <div className="flex gap-1 mb-4">
                                    {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                                </div>
                                <p className="text-neutral-300 mb-6 leading-relaxed italic">"{t.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${i === 0 ? 'from-emerald-400 to-emerald-600' : i === 1 ? 'from-red-400 to-red-600' : 'from-amber-400 to-amber-600'} flex items-center justify-center text-white font-bold text-xs`}>
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-sm">{t.name}</div>
                                        <div className="text-neutral-500 text-xs">{t.role}</div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>

        {/* --- FILOSOFIA (BENTO) --- */}
        <section id="about" className="py-32 bg-neutral-900/30 border-y border-neutral-800 relative">
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              <div className="md:col-span-8 flex flex-col justify-center">
                 <FadeIn>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Não vendo apenas código.<br/>
                    <span className="text-neutral-500">Vendo paz de espírito.</span>
                    </h2>
                 </FadeIn>
              </div>
              
              <div className="md:col-span-4">
                <StaggerItem className="h-full">
                    <SpotlightCard className="p-8 bg-neutral-950 border-neutral-800 h-full">
                        <div className="text-6xl font-bold text-white mb-2 flex items-center gap-2">
                        100% <BarChart3 className="w-8 h-8 text-green-500" />
                        </div>
                        <p className="text-neutral-400">Score no Google Lighthouse em todos os projetos. Velocidade é dinheiro.</p>
                    </SpotlightCard>
                </StaggerItem>
              </div>

              <div className="md:col-span-4">
                <StaggerItem className="h-full">
                    <SpotlightCard className="p-8 h-full">
                        <Zap className="w-10 h-10 text-yellow-500 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Performance Obsessiva</h3>
                        <p className="text-neutral-400 text-sm">Sites rápidos convertem mais. Otimizo cada imagem, cada script, cada byte.</p>
                    </SpotlightCard>
                </StaggerItem>
              </div>
              
              <div className="md:col-span-4">
                <StaggerItem className="h-full">
                    <SpotlightCard className="p-8 h-full">
                        <Globe className="w-10 h-10 text-blue-500 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">SEO Nativo</h3>
                        <p className="text-neutral-400 text-sm">JSON-LD, Meta tags dinâmicas e sitemaps. O Google vai amar o seu site.</p>
                    </SpotlightCard>
                </StaggerItem>
              </div>

              <div className="md:col-span-4">
                <StaggerItem className="h-full">
                    <SpotlightCard className="p-8 h-full">
                        <Code2 className="w-10 h-10 text-indigo-500 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Código Limpo</h3>
                        <p className="text-neutral-400 text-sm">Next.js e React Server Components. O futuro da web, hoje.</p>
                    </SpotlightCard>
                </StaggerItem>
              </div>

            </StaggerContainer>
          </div>
        </section>

        {/* --- NOVO DESIGN: ONBOARDING / CTA --- */}
        <section className="py-32 container mx-auto px-4 max-w-5xl">
            <FadeIn>
                <div className="text-center mb-16">
                    <Badge variant="outline" className="text-indigo-400 border-indigo-500/20 bg-indigo-500/10 mb-4">Start Here</Badge>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">O Seu Caminho para o Sucesso</h2>
                    <p className="text-neutral-400">Três passos simples para iniciarmos uma parceria de sucesso.</p>
                </div>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-3 gap-8 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent z-0" />

                {[
                    { 
                        icon: <MessageSquare className="w-6 h-6"/>, 
                        title: "1. Aplicação", 
                        desc: "Preencha o formulário rápido para eu entender se somos um bom fit.",
                        action: "Preencher Agora"
                    },
                    { 
                        icon: <Calendar className="w-6 h-6"/>, 
                        title: "2. Discovery Call", 
                        desc: "Uma reunião estratégica de 30min para definir objetivos e ROI.",
                        action: "Ver Agenda"
                    },
                    { 
                        icon: <Rocket className="w-6 h-6"/>, 
                        title: "3. Kick-off", 
                        desc: "Aprovamos a proposta e iniciamos o sprint na mesma semana.",
                        action: "Começar"
                    }
                ].map((step, i) => (
                    <StaggerItem key={i} className="relative z-10">
                        <SpotlightCard className="p-8 flex flex-col items-center text-center h-full border-neutral-800 bg-neutral-900 shadow-2xl">
                            <div className="w-24 h-24 rounded-full bg-neutral-950 border-4 border-neutral-900 flex items-center justify-center text-indigo-400 mb-6 shadow-lg shadow-indigo-500/20 relative">
                                <span className="absolute -top-2 -right-2 w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center text-white font-bold border border-neutral-700">
                                    {i + 1}
                                </span>
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">{step.desc}</p>
                            <div className="mt-auto pt-4 border-t border-neutral-800 w-full">
                                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center justify-center gap-2 group cursor-pointer hover:text-indigo-300 transition-colors">
                                    {step.action} <ChevronRight className="w-3 h-3" />
                                </span>
                            </div>
                        </SpotlightCard>
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </section>

        {/* --- CTA FOOTER --- */}
        <footer id="contact" className="relative pt-32 pb-10 px-4 overflow-hidden bg-neutral-950">
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start mb-24 border-b border-neutral-800 pb-20">
               <FadeIn className="max-w-xl">
                 <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8">
                   Let's<br />Talk.
                 </h2>
                 <p className="text-xl text-neutral-400">
                    Tem um projeto ambicioso em mente? <br/>
                    Vamos construir algo extraordinário juntos.
                 </p>
               </FadeIn>
               
               <FadeIn delay={0.2} className="flex flex-col gap-6 items-end mt-12 md:mt-0">
                 <Button size="lg" className="rounded-full text-xl px-12 py-8 bg-white text-black hover:bg-neutral-200 font-bold transition-transform hover:scale-105 shadow-[0_0_50px_-10px_rgba(255,255,255,0.2)]">
                   Iniciar Projeto
                 </Button>
                 <div className="flex items-center gap-2 text-neutral-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    A aceitar novos clientes para este mês
                 </div>
               </FadeIn>
            </div>

            <div className="flex flex-col md:flex-row justify-around items-center text-neutral-500 text-sm gap-4">
               <p>&copy; {new Date().getFullYear()} Innera AI. Todos os direitos reservados.</p>

            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-indigo-900/10 to-transparent pointer-events-none" />
        </footer>
      </main>
    </div>
  );
}