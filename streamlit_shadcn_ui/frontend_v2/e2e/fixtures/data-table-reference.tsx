import { createRoot } from "react-dom/client"
import { ArrowUpDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

Object.assign(window, {
  mountDataTableReference(target: HTMLElement) {
    createRoot(target).render(
      <div>
        <Input aria-label="Reference search" placeholder="Search rows..." />
        <Button variant="outline">Columns</Button>
        <Button variant="outline" disabled>
          Previous
        </Button>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox aria-label="Reference select" />
              </TableHead>
              <TableHead>
                <Button variant="ghost">
                  name
                  <ArrowUpDownIcon />
                </Button>
              </TableHead>
              <TableHead>amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[0, 1, 2].map((index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox aria-label="Reference row" />
                </TableCell>
                <TableCell>Record 0</TableCell>
                <TableCell>100</TableCell>
                <TableCell>
                  <Button variant="outline">Actions</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
})
