/**
 * src/components/ui/index.ts
 *
 * Barrel export — lets feature components write:
 *   import { Button, Card, Badge } from "@/components/ui";
 */

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from "./Button";
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./Card";
export { Badge, type BadgeVariant } from "./Badge";
export { Modal } from "./Modal";
export { Accordion, type AccordionItemData } from "./Accordion";
export { Carousel, CarouselItem } from "./Carousel";
export { ToastProvider, useToast } from "./Toast";
export { Skeleton, ProductCardSkeleton } from "./Skeleton";
export { EmptyState } from "./EmptyState";
