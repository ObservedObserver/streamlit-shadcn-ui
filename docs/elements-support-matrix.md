# Widget and Elements composition support

This matrix describes repository source, not a newly published package.
Standalone widgets mount separately; only Elements nodes can be children of
an Elements container. Native `st.*` commands cannot be inserted into that tree.

| Capability | Standalone Python widget | Elements | Children and events |
| --- | --- | --- | --- |
| Tabs | Yes, selected value and change callback | `tabs` / `tab` | Typed panels with browser-local selection; input descendants retain their own values and callbacks |
| Accordion | Yes, text items and selected values | `accordion` / `accordion_item` | Typed panels with browser-local expansion; single or multiple items |
| Collapsible | Yes, text content and open value | `collapsible` | Supported Elements children; browser-local expansion |
| Scroll Area | Yes, string items | `scroll_area` | Supported Elements children; scrolling stays local |
| Card | Yes | Card header/content/footer slots | Layout only |
| Dialog | No separate widget | Dialog/footer/close button | Local open state; close button emits an action |
| Sheet | No separate widget | Sheet/footer/close button | Local open state, four sides, shared modal ownership; close button emits an action |
| Button Group | No separate widget | Nested groups, buttons, separator, text | Child button actions |
| Field | No separate widget | Field set/group/field/separator | One supported input per Field; input state and errors |
| Empty | No separate widget | Header/media/title/description/content | Supported slots; actions in content |
| Tooltip | No separate widget | One Button or Link Button trigger | Local hover/focus; child action remains available |
| Input, Input Group, Number Input, Textarea, Checkbox, Switch, Slider, Radio Group, Select, Combobox | Yes | Yes | Value handles and optional change callbacks |
| Button, Link Button | Yes | Yes | Button action handle/callback; links navigate |
| Badge, Separator, Progress | Yes | Yes | Display only |
| Item | No separate widget | Typed Item/group/media/content/title/description/actions/header/footer/separator slots | Child action events; image media uses native `item_image` |
| Avatar | Yes | `avatar` | Display only, with image-failure fallback |
| Spinner | No separate widget | Yes | Display/status only |
| Heading, Text, Code, Image | No matching standalone library API | Yes | Display only; Code is plain code text |
| Table, six Chart families | Yes | Not yet | Standalone display; no Elements child slots |
| Data Table | Yes | Deferred | Local sorting, search, paging and visibility; revisioned row selection and one-shot row actions |
| Skeleton, Calendar, Date Picker, Input OTP, Toggle, Toggle Group, Pagination, Breadcrumb, Alert, Alert Dialog, Dropdown Menu, Popover, Hover Card, Aspect Ratio | Yes | Not exposed by the public builder | Standalone contracts apply |

Panel defaults and lifecycle are documented in [Elements](./components/elements.md).
A local panel navigation event never triggers Python by itself. A child input
change or action still uses the existing Elements state/trigger protocol.
State-only trees can use Streamlit form behavior; action nodes retain the
existing restriction inside `st.form`.
