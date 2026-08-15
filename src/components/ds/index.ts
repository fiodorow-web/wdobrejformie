/**
 * Design-system barrel.
 *
 * _adherence.oxlintrc.json enforces importing from here rather than reaching
 * into component files directly, so this is the only supported entry point.
 */

export { Button } from './Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './Button';

export { Badge } from './Badge';
export type { BadgeProps, BadgeTone } from './Badge';

export { Card } from './Card';
export type { CardProps, CardVariant } from './Card';

export { Accordion } from './Accordion';
export type { AccordionProps, AccordionItem } from './Accordion';

export { Input } from './Input';
export type { InputProps } from './Input';

export { Textarea } from './Textarea';
export type { TextareaProps } from './Textarea';

export { Select } from './Select';
export type { SelectProps } from './Select';

export { Checkbox } from './Checkbox';
export type { CheckboxProps } from './Checkbox';

export { NavBar } from './NavBar';
export type { NavBarProps } from './NavBar';

export { Footer } from './Footer';

export { HeroSlider } from './HeroSlider';
export type { HeroSliderProps, HeroSlide } from './HeroSlider';

export { PricingItem } from './PricingItem';
export type { PricingItemProps } from './PricingItem';

export { StatBadge } from './StatBadge';
export type { StatBadgeProps } from './StatBadge';

export { TestimonialCard } from './TestimonialCard';
export type { TestimonialCardProps } from './TestimonialCard';

export { ServiceIconCard } from './ServiceIconCard';
export type { ServiceIconCardProps } from './ServiceIconCard';

export { Eyebrow } from './Eyebrow';
export type { EyebrowProps, EyebrowTone } from './Eyebrow';

export { Reveal } from './Reveal';
export type { RevealProps } from './Reveal';

export { ImageSlot } from './ImageSlot';
export type { ImageSlotProps } from './ImageSlot';

export { VideoSlot } from './VideoSlot';
export type { VideoSlotProps } from './VideoSlot';

export { Video } from './Video';
export type { VideoProps } from './Video';

export { Section } from './Section';
export type { SectionProps, SectionTone } from './Section';
