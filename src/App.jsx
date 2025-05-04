import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  // State management
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [showWhatsappTooltip, setShowWhatsappTooltip] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Scroll event handler
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowScrollTop(window.scrollY > 500);
      
      // Determine active section based on scroll position
      const sections = ['home', 'features', 'testimonials', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto rotate testimonials
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(testimonialInterval);
  }, []);

  // Check for user's preferred color scheme
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setDarkMode(e.matches);
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg shadow-2xl z-50 flex items-center';
    notification.innerHTML = '<i class="fas fa-check-circle mr-2"></i> تم إرسال البيانات بنجاح! سنتواصل معك قريباً';
    document.body.appendChild(notification);
    
    // Add fade-out animation
    setTimeout(() => {
      notification.classList.add('opacity-0', 'transition-opacity', 'duration-500');
      setTimeout(() => document.body.removeChild(notification), 500);
    }, 3000);
    
    // Set form as submitted for success message
    setIsFormSubmitted(true);
    
    // Reset form
    setFormData({ name: '', email: '', phone: '' });
    
    // Reset form submission status after 5 seconds
    setTimeout(() => {
      setIsFormSubmitted(false);
    }, 5000);
  };

  // Navigation helpers
  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Data for sections
  const services = [
    {
      icon: "fas fa-paint-brush",
      title: "تصميم عصري",
      description: "نقدم تصاميم عصرية وجذابة تناسب هويتك التجارية وتلبي احتياجات عملائك",
      color: "indigo"
    },
    {
      icon: "fas fa-rocket",
      title: "سرعة في الأداء",
      description: "نضمن لك سرعة فائقة في تنفيذ المشاريع مع الحفاظ على أعلى معايير الجودة",
      color: "purple"
    },
    {
      icon: "fas fa-shield-alt",
      title: "حماية وأمان",
      description: "نوفر أعلى درجات الحماية والأمان لبياناتك ومعلوماتك الشخصية والتجارية",
      color: "pink"
    }
  ];

  const testimonials = [
    {
      id: 1,
      text: "لقد تعاملت مع شركة الإبداع لأكثر من عامين، وكانت التجربة رائعة من جميع النواحي. فريق العمل محترف ويقدم حلولاً مبتكرة لجميع التحديات التي واجهتنا.",
      author: "أحمد محمد",
      role: "المدير التنفيذي، شركة الأفق",
      color: "amber",
      image: "https://randomuser.me/api/portraits/men/42.jpg"
    },
    {
      id: 2,
      text: "ساعدتنا شركة الإبداع على زيادة مبيعاتنا بنسبة 200% خلال 6 أشهر فقط. الخدمات التي يقدمونها متميزة وفريدة من نوعها. أنصح بالتعامل معهم.",
      author: "سارة علي",
      role: "مديرة التسويق، مؤسسة النجاح",
      color: "teal",
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 3,
      text: "تميزت شركة الإبداع بالاحترافية والمصداقية والجودة العالية في تقديم خدماتها. ساعدونا في تطوير استراتيجية تسويقية متكاملة حققت نتائج مذهلة.",
      author: "محمد خالد",
      role: "مدير العمليات، شركة الرواد",
      color: "indigo",
      image: "https://randomuser.me/api/portraits/men/24.jpg"
    }
  ];

  // Additional statistics data
  const statistics = [
    { value: "500+", label: "عميل سعيد", icon: "fas fa-smile" },
    { value: "150+", label: "مشروع منجز", icon: "fas fa-project-diagram" },
    { value: "10+", label: "سنوات خبرة", icon: "fas fa-calendar-alt" },
    { value: "24/7", label: "دعم فني", icon: "fas fa-headset" }
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div dir="rtl" lang="ar" className={`font-sans ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-b from-indigo-50 to-purple-50 text-gray-800'} overflow-x-hidden`}>
      {/* Dark Mode Toggle */}
      <motion.button
        onClick={toggleDarkMode}
        className={`fixed top-24 left-8 z-50 ${darkMode ? 'bg-gray-700' : 'bg-white'} text-${darkMode ? 'yellow-300' : 'indigo-600'} p-3 rounded-full shadow-lg`}
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.95 }}
      >
        <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} fa-lg`}></i>
      </motion.button>

      {/* WhatsApp Floating Button */}
      <motion.a 
        href="https://wa.me/966555555555" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-lg"
        whileHover={{ scale: 1.1, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setShowWhatsappTooltip(true)}
        onMouseLeave={() => setShowWhatsappTooltip(false)}
      >
        <i className="fab fa-whatsapp fa-lg"></i>
        {showWhatsappTooltip && (
          <motion.span 
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 bg-gray-800 text-white text-sm py-2 px-4 rounded whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            تواصل معنا عبر واتساب
            <span className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-800"></span>
          </motion.span>
        )}
      </motion.a>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-arrow-up"></i>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-indigo-800 to-purple-900'} py-4 fixed w-full top-0 z-50 shadow-lg transition-all duration-300 ${scrollY > 50 ? 'bg-opacity-95 py-3' : 'bg-opacity-100 py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <motion.a 
              href="#" 
              className="text-2xl font-bold text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-300">شركة</span> الإبداع
            </motion.a>
            
            {/* Desktop Menu */}
            <motion.nav 
              className="hidden md:block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ul className="flex items-center space-x-8 space-x-reverse">
                {['home', 'features', 'testimonials', 'contact'].map((section) => (
                  <motion.li key={section} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <a 
                      href={`#${section}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(section);
                      }}
                      className={`text-white hover:text-purple-200 transition-colors font-medium relative ${activeSection === section ? 'text-purple-200' : ''}`}
                    >
                      {section === 'home' ? 'الرئيسية' : 
                       section === 'features' ? 'المميزات' : 
                       section === 'testimonials' ? 'الآراء' : 'التواصل'}
                      
                      {activeSection === section && (
                        <motion.span 
                          className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-300"
                          layoutId="underline"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </a>
                  </motion.li>
                ))}
                <motion.li whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                  <a 
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('contact');
                    }}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-2 rounded-full font-bold hover:from-purple-600 hover:to-indigo-600 transition-all shadow-md"
                  >
                    ابدأ الآن
                  </a>
                </motion.li>
              </ul>
            </motion.nav>
            
            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className={`md:hidden ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-b from-indigo-800 to-purple-900'} shadow-lg`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-4">
                <ul className="space-y-4">
                  {['home', 'features', 'testimonials', 'contact'].map((section) => (
                    <motion.li 
                      key={section}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ x: 5 }}
                    >
                      <a 
                        href={`#${section}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(section);
                        }}
                        className={`block text-white hover:text-purple-200 transition-colors font-medium ${activeSection === section ? 'text-purple-200' : ''}`}
                      >
                        {section === 'home' ? 'الرئيسية' : 
                         section === 'features' ? 'المميزات' : 
                         section === 'testimonials' ? 'الآراء' : 'التواصل'}
                      </a>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2, delay: 0.4 }}
                  >
                    <a 
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('contact');
                      }}
                      className="inline-block bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-2 rounded-full font-bold hover:from-purple-600 hover:to-indigo-600 transition-all shadow-md"
                    >
                      ابدأ الآن
                    </a>
                  </motion.li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section 
        id="home" 
        className={`pt-32 pb-20 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-indigo-900 to-purple-900'} text-white relative overflow-hidden`}
      >
        <div className="absolute inset-0 z-0" style={{ backgroundPosition: `center ${scrollY * 0.2}px` }}>
          <div className={`w-full h-full ${darkMode ? 'bg-gray-900' : 'bg-indigo-900'} opacity-50 absolute`}></div>
          <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80" alt="" className="w-full h-full object-cover opacity-20" />
        </div>
        
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full opacity-20" 
          style={{ transform: `translate(20%, -30%) scale(${1 + scrollY * 0.001})` }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-20 left-10 w-48 h-48 bg-indigo-500 rounded-full opacity-20" 
          style={{ transform: `translate(-20%, 30%) scale(${1 + scrollY * 0.002})` }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div 
              className="lg:max-w-2xl mb-10 lg:mb-0 text-center lg:text-right"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6 text-purple-100">
                حلول رقمية<span className="text-indigo-300"> مبتكرة </span>
                لتطوير أعمالك
              </h1>
              <p className="text-xl mb-8 font-normal text-indigo-100">
                نقدم أحدث التقنيات والخدمات المتميزة لمساعدتك على تحقيق النجاح والنمو في عالم الأعمال الرقمي المتطور
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <motion.a 
                  href="#contact" 
                  className="inline-block bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:from-purple-600 hover:to-indigo-600 transition-all"
                  whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }}
                >
                  احصل على العرض
                </motion.a>
                <motion.a 
                  href="#features" 
                  className="inline-block bg-transparent border-2 border-purple-400 text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:bg-purple-500 hover:border-purple-500 transition-all"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('features');
                  }}
                >
                  اكتشف خدماتنا
                </motion.a>
              </div>
            </motion.div>
            <motion.div 
              className="lg:max-w-xl relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-lg opacity-30 blur-xl animate-pulse"></div>
              <motion.img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" 
                alt="صورة توضيحية" 
                className="rounded-lg shadow-2xl border-4 border-indigo-200 relative z-10" 
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
            </motion.div>
          </div>
          
          {/* Statistics Section */}
          <motion.div 
            className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 ${darkMode ? 'bg-gray-800' : 'bg-white bg-opacity-10'} backdrop-blur-md p-8 rounded-xl`}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {statistics.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={fadeInUp}
              >
                <motion.div 
                  className="text-4xl text-indigo-400 mb-2"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, index % 2 === 0 ? 5 : -5, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.2
                  }}
                >
                  <i className={stat.icon}></i>
                </motion.div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-indigo-200">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill={darkMode ? "#1f2937" : "#ffffff"} fillOpacity="1" d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,138.7C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features" 
        className={`py-24 ${darkMode ? 'bg-gray-900' : 'bg-white'} relative overflow-hidden`}
      >
        <div className={`absolute -top-16 -right-16 w-64 h-64 ${darkMode ? 'bg-gray-800' : 'bg-indigo-100'} rounded-full opacity-50`}></div>
        <div className={`absolute top-1/3 -left-16 w-48 h-48 ${darkMode ? 'bg-gray-800' : 'bg-purple-100'} rounded-full opacity-50`}></div>
        <div className={`absolute bottom-16 right-16 w-56 h-56 ${darkMode ? 'bg-gray-800' : 'bg-pink-100'} rounded-full opacity-50`}></div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 ${darkMode ? 'text-indigo-400' : 'text-indigo-800'} relative inline-block`}>
              ما يميزنا
              <div className="absolute h-1 w-full bg-gradient-to-r from-purple-400 to-indigo-400 bottom-0 left-0 transform -translate-y-2"></div>
            </h2>
            <p className={`max-w-2xl mx-auto mt-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              نقدم مجموعة متكاملة من الخدمات الرقمية المبتكرة التي تساعد شركتك على النمو والتطور في السوق التنافسي
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`${darkMode ? 'bg-gray-800' : `bg-gradient-to-br from-${service.color}-50 to-${service.color}-100`} rounded-xl p-8 text-center relative overflow-hidden group`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-300 rounded-bl-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <motion.div 
                  className={`text-5xl text-${service.color}-600 mb-6 relative z-10`}
                  animate={{ 
                    y: index === 1 ? [0, -10, 0] : undefined,
                    rotate: index === 0 ? [0, 10, 0] : undefined,
                    scale: index === 2 ? [1, 1.2, 1] : undefined
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <i className={service.icon}></i>
                </motion.div>
                <h3 className={`text-xl font-bold mb-4 text-${service.color}-800`}>{service.title}</h3>
                <p className={`text-${service.color}-700`}>{service.description}</p>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-200 rounded-full opacity-20"></div>
              </motion.div>
            ))}
          </div>
          
          {/* Feature Blocks */}
          <motion.div 
            className="mt-24 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl p-12 shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-indigo-800">تحسين محركات البحث</h3>
                <p className="text-lg mb-6 text-gray-700">نساعدك على التواجد في مقدمة نتائج البحث وجذب المزيد من العملاء المستهدفين من خلال استراتيجيات SEO المتقدمة</p>
                <ul className="space-y-4">
                  <motion.li 
                    className="flex items-center text-indigo-800"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-purple-500 ml-2 text-xl"><i className="fas fa-check-circle"></i></span>
                    تحليل الكلمات المفتاحية المستهدفة
                  </motion.li>
                  <motion.li 
                    className="flex items-center text-indigo-800"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <span className="text-purple-500 ml-2 text-xl"><i className="fas fa-check-circle"></i></span>
                    تحسين محتوى الموقع
                  </motion.li>
                  <motion.li 
                    className="flex items-center text-indigo-800"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <span className="text-purple-500 ml-2 text-xl"><i className="fas fa-check-circle"></i></span>
                    بناء الروابط الخلفية عالية الجودة
                  </motion.li>
                </ul>
              </div>
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-lg opacity-30 blur-md"></div>
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" 
                  alt="تحسين محركات البحث" 
                  className="rounded-lg shadow-xl border-4 border-white relative z-10" 
                />
                <motion.div 
                  className="absolute -bottom-5 -right-5 bg-indigo-500 text-white font-bold px-4 py-2 rounded-lg shadow-lg"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  زيادة الظهور 200%
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        id="testimonials" 
        className="py-24 bg-gradient-to-b from-purple-50 to-indigo-50 relative"
      >
        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L48,218.7C96,213,192,203,288,181.3C384,160,480,128,576,138.7C672,149,768,203,864,224C960,245,1056,235,1152,213.3C1248,192,1344,160,1392,144L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
        
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-indigo-800 relative inline-block">
              آراء عملائنا
              <div className="absolute h-1 w-full bg-gradient-to-r from-indigo-400 to-purple-400 bottom-0 left-0 transform -translate-y-2"></div>
            </h2>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            {/* Testimonials Slider */}
            <div className="relative h-96 mb-10">
              {testimonials.map((testimonial, index) => (
                <AnimatePresence key={testimonial.id} initial={false}>
                  {currentTestimonial === index && (
                    <motion.div 
                      className={`bg-white rounded-xl p-10 shadow-xl relative overflow-hidden absolute inset-0`}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <div className={`absolute top-0 right-0 bg-${testimonial.color}-400 p-4 rounded-bl-lg`}>
                        <span className="text-2xl">⭐⭐⭐⭐⭐</span>
                      </div>
                      <div className="mt-6">
                        <p className="text-lg italic mb-8 text-gray-700">
                          "{testimonial.text}"
                        </p>
                        <div className="flex items-center">
                          <div className={`w-16 h-16 bg-gradient-to-r from-${testimonial.color}-400 to-${testimonial.color}-600 rounded-full overflow-hidden ml-4 flex items-center justify-center`}>
                            <img 
                              src={testimonial.image}
                              alt={testimonial.author} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className={`font-bold text-${testimonial.color}-800`}>{testimonial.author}</p>
                            <p className="text-gray-500 text-sm">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                      <div className={`absolute -bottom-12 -left-12 w-40 h-40 bg-${testimonial.color}-200 rounded-full opacity-20`}></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>
            
            {/* Slider Controls */}
            <div className="flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${currentTestimonial === index ? 'bg-indigo-600 w-8' : 'bg-indigo-300'}`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        id="contact" 
        className="py-24 bg-gradient-to-r from-indigo-800 to-purple-900 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full overflow-hidden transform rotate-180">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="0.2" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
        
        {/* Animated background elements */}
        <motion.div 
          className="absolute -top-10 right-10 w-40 h-40 bg-purple-500 rounded-full opacity-10"
          animate={{ 
            y: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
        <motion.div 
          className="absolute top-1/4 left-10 w-56 h-56 bg-indigo-500 rounded-full opacity-10"
          animate={{ 
            x: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
              هل أنت مستعد للانطلاق؟
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-purple-100">
              سجل بياناتك الآن للحصول على استشارة مجانية واستفد من عروضنا الحصرية
            </p>
          </motion.div>
          
          <motion.div 
            className="max-w-lg mx-auto bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-8 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2">الاسم الكامل</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 rounded-lg text-gray-800 text-right bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" 
                placeholder="أدخل اسمك الكامل"
              />
            </div>
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2">البريد الإلكتروني</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 rounded-lg text-gray-800 text-right bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" 
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>
            <div className="mb-8">
              <label className="block text-white text-sm font-medium mb-2">رقم الهاتف</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-4 rounded-lg text-gray-800 text-right bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all" 
                placeholder="أدخل رقم هاتفك"
              />
            </div>
            <motion.button 
              onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-4 px-10 rounded-lg text-lg font-bold transition-all shadow-md w-full"
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              إرسال الطلب
            </motion.button>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#1a202c" fillOpacity="1" d="M0,96L48,128C96,160,192,224,288,240C384,256,480,224,576,186.7C672,149,768,107,864,117.3C960,128,1056,192,1152,202.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-lg font-bold mb-6 text-purple-300">شركتنا</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors inline-block">من نحن</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors inline-block">فريق العمل</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors inline-block">الوظائف</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors inline-block">الشركاء</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-indigo-300">خدماتنا</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors inline-block">تطوير المواقع</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors inline-block">التسويق الرقمي</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors inline-block">تحسين محركات البحث</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors inline-block">تصميم الهوية</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-pink-300">اتصل بنا</h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <i className="fas fa-phone-alt text-gray-400 ml-2"></i>
                  <a href="tel:+966555555555" className="text-gray-400 hover:text-white transition-colors">+966 55 555 5555</a>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope text-gray-400 ml-2"></i>
                  <a href="mailto:info@example.com" className="text-gray-400 hover:text-white transition-colors">info@example.com</a>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-map-marker-alt text-gray-400 ml-2"></i>
                  <span className="text-gray-400">الرياض، السعودية</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-green-300">تابعنا</h4>
              <div className="flex space-x-4 space-x-reverse">
                <a href="#" className="bg-gray-800 hover:bg-gray-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-gray-400 text-sm text-center">
            <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} شركة الإبداع</p>
          </div>
        </div>
      </footer>
      
      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        .animate-pulse {
          animation: pulse 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default App;