import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				heading: ['Poppins', 'sans-serif'],
				body: ['Open Sans', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sciscribe: {
					navy: '#0B1B2A', // Deep Navy (keeping for compatibility)
					teal: '#14B8A6', // Vibrant Teal (now primary)
					light: '#F9FAFD', // Ultra Light Teal background
					dark: '#141E26', // Deep Charcoal
					darkAccent: '#1E252D',
					purple: '#A855F7', // Vibrant Purple (now accent)
					blue: '#0EA5E9', // Cyan Blue
					pink: '#D946EF',
					dark: '#121212',
					emerald: '#10B981', // Success Color
					coral: '#F97066', // Alternative accent/highlight
					slate: '#64748B', // Neutral slate
					mist: '#E5E7EB', // Mist Gray for card backgrounds/dividers
					gold: '#F59E0B', // Gold color for gradients and accents
					amber: '#FBBF24', // Amber color for gradients
					sky: '#7DD3FC', // Light blue for hover states
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in': {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'rotate-gradient': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'scale-up': {
					'0%': { transform: 'scale(1)' },
					'100%': { transform: 'scale(1.05)' }
				},
				'scale-down': {
					'0%': { transform: 'scale(1.05)' },
					'100%': { transform: 'scale(1)' }
				},
				'bounce-sm': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-4px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.7s ease-out',
				'slide-in': 'slide-in 0.7s ease-out',
				'slide-up': 'slide-up 0.7s ease-out',
				'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'shimmer': 'shimmer 3s linear infinite',
				'rotate-gradient': 'rotate-gradient 3s ease infinite',
				'scale-up': 'scale-up 0.3s ease forwards',
				'scale-down': 'scale-down 0.3s ease forwards',
				'bounce-sm': 'bounce-sm 2s ease-in-out infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-primary': 'linear-gradient(90deg, #14B8A6 0%, #0EA5E9 100%)',
				'gradient-secondary': 'linear-gradient(90deg, #A855F7 0%, #D946EF 100%)',
				'gradient-teal': 'linear-gradient(90deg, #2DD4BF 0%, #14B8A6 100%)',
				'gradient-purple': 'linear-gradient(90deg, #A855F7 0%, #D946EF 100%)',
				'gradient-coral': 'linear-gradient(90deg, #F97066 0%, #FB923C 100%)',
				'gradient-shimmer': 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.2) 20%, transparent 40%, transparent 100%)',
				'gradient-dark': 'linear-gradient(180deg, #141E26 0%, #1E252D 100%)',
				'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
				'gradient-mesh': 'radial-gradient(at 80% 20%, hsla(175, 84%, 32%, 0.2) 0px, transparent 50%), radial-gradient(at 20% 70%, hsla(265, 80%, 65%, 0.2) 0px, transparent 50%)',
				'gradient-gold': 'linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)',
				'gradient-blue': 'linear-gradient(90deg, #0EA5E9 0%, #14B8A6 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
