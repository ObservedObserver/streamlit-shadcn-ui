import { createRoot } from "react-dom/client"
import {
  Item,
  ItemGroup,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/components/ui/item"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

Object.assign(window, {
  mountItemReference(target: HTMLElement) {
    createRoot(target).render(
      <ItemGroup>
        <Item variant="outline" role="listitem">
          <ItemMedia>
            <Avatar aria-label="Ada">
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Ada</ItemTitle>
            <ItemDescription>Workspace member</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button>Manage Ada</Button>
          </ItemActions>
        </Item>
      </ItemGroup>
    )
  },
})
