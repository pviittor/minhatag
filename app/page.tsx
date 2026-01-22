"use client";

import { useState } from "react";
import { 
  Linkedin, 
  Github, 
  Instagram, 
  MessageCircle, 
  UserPlus,
  MapPin,
  Copy,
  Check
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import pixIcon from "./assets/pix01.png";
import profileImg from "./assets/profile.jpg";

export default function Home() {
  const [copiedPix, setCopiedPix] = useState(false);
  const pixKey = "000.000.000-00"; // Substitua pela sua chave Pix real

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    toast.success("Chave Pix copiada com sucesso!", {
      description: "Agora é só colar no seu app de banco."
    });
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Paulo Victor
N:Victor;Paulo;;;
TITLE:Software Developer
URL:https://www.linkedin.com/in/pviittor11/
NOTE:Conecte-se comigo no LinkedIn!
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "contato_paulo_victor.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Contato salvo!", {
      description: "O arquivo .vcf foi baixado para o seu dispositivo."
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Paulo Victor - Digital Card',
          text: 'Confira meu cartão de visitas digital!',
          url: window.location.href,
        });
        toast.success("Compartilhado com sucesso!");
      } catch (error) {
        console.error('Error sharing:', error);
        toast.error("Erro ao compartilhar.");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado para a área de transferência!");
    }
  };

  const socialLinks = [
    {
      name: "WhatsApp",
      url: "https://wa.me/5500000000000", // Placeholder
      icon: MessageCircle,
      color: "bg-green-600 hover:bg-green-700",
      textColor: "text-white"
    },
    {
      name: "Instagram",
      url: "https://instagram.com/pviittor11", // Placeholder
      icon: Instagram,
      color: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90",
      textColor: "text-white"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/pviittor11/",
      icon: Linkedin,
      color: "bg-[#0077b5] hover:bg-[#005e93]",
      textColor: "text-white"
    },
    {
      name: "GitHub",
      url: "https://github.com/pviittor11", // Placeholder
      icon: Github,
      color: "bg-gray-900 hover:bg-gray-800",
      textColor: "text-white"
    }
  ];

  return (
    <main className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-50">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1920&auto=format&fit=crop"
          alt="Office Background"
          fill
          className="object-cover blur-[2px] opacity-200"
          priority
        />
        <div className="absolute inset-0 bg-white/40" />
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Header Profile */}
        <div className="flex flex-col items-center text-center">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-900 to-indigo-900 rounded-full opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt blur"></div>
            <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-xl bg-white flex items-center justify-center">
              <Image 
                src={profileImg} 
                alt="Paulo Victor" 
                fill 
                className="object-cover"
                priority
              />
            </div>
          </div>
          
          <h1 className="mt-6 text-2xl font-bold text-gray-900 tracking-tight">Paulo Victor</h1>
          <p className="text-gray-700 font-medium mt-1">Software Developer</p>
          
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
            <MapPin size={16} />
            <span>Brasil</span>
          </div>

          <p className="mt-4 text-gray-700 max-w-xs mx-auto text-sm leading-relaxed font-medium">
            Transformando ideias em código. Conecte-se comigo!
          </p>
        </div>

        {/* Links Section */}
        <div className="space-y-4 mt-8">
          
          {/* Pix Button */}
          <button
            onClick={handleCopyPix}
            className="group flex items-center justify-between w-full p-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                <Image 
                  src={pixIcon} 
                  alt="Pix Logo"
                  width={32} 
                  height={32} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <span className="block text-sm font-semibold text-gray-900">Pix Paulo Vitor</span>
                <span className="block text-xs text-gray-500 font-medium">Banco Inter - Chave Aleatória</span>
              </div>
            </div>
            <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
              {copiedPix ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </div>
          </button>

          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-between w-full p-4 rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${link.color} ${link.textColor}`}
            >
              <div className="flex items-center gap-4">
                <link.icon className="w-6 h-6" />
                <span className="font-semibold text-lg">{link.name}</span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}

          {/* Save Contact Button */}
          <button
            onClick={handleDownloadVCard}
            className="group flex items-center justify-between w-full p-4 bg-white/90 backdrop-blur-sm text-gray-900 border-2 border-gray-200 rounded-xl hover:border-gray-900 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <UserPlus className="w-6 h-6 text-gray-900" />
              <span className="font-semibold text-lg">Salvar Contato</span>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="pt-8 text-center">
          <p className="text-xs text-gray-500 font-medium">
            © {new Date().getFullYear()} Paulo Victor. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}