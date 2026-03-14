/**
 * AlertDialog molecule.
 * Re-exports shadcn AlertDialog sub-parts so feature components import
 * from the molecule layer instead of ui/ directly.
 */

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../ui/alert-dialog'
