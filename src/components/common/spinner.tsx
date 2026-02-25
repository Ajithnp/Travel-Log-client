import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerLoading({ title }: { title: string }) {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center">
      <div className="w-full max-w-sm">
        <Item variant="muted" className="[--radius:1rem]">
          <ItemMedia>
            <Spinner />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="line-clamp-1">
              {title}
            </ItemTitle>
          </ItemContent>
        </Item>
      </div>
    </div>
  )
}