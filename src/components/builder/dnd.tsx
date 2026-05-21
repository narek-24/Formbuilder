// "use client";

// import { type FormSchemaField } from "@/lib/schemas/form-schemas";

// import {
//   FIELD_REGISTRY,
//   type FieldPlugin,
// } from "@/components/builder/fields/registry";
// import { useBuilderStore } from "./hooks/use-builder-store";

// import {
//   DragDropProvider,
//   DragOverlay,
//   PointerSensor,
//   useDraggable,
//   useDroppable,
// } from "@dnd-kit/react";
// import { getDefaultValues } from "./fields/default-values";
// import { isSortable, useSortable } from "@dnd-kit/react/sortable";
// import { Button } from "../ui/button";
// import { PointerActivationConstraints } from "@dnd-kit/dom";

// export default function Builder() {
//   const addField = useBuilderStore((state) => state.addField);

//   return (
//     <DragDropProvider
//       onDragEnd={(e) => {
//         const { source, target } = e.operation;

//         const isSourcePanelItem = source && source.data.panelItem;
//         if (!isSourcePanelItem || !target) return;

//         if (isSortable(target) && target.type === "sortable") {
//           addField(getDefaultValues(source.data.type), target.index);
//           return;
//         }

//         if (target.id === "last-item") {
//           addField(getDefaultValues(source.data.type));
//           return;
//         }
//       }}
//     >
//       <div className="container grid gap-8 pt-4 pb-9 lg:grid-cols-[300px_1fr] xl:grid-cols-[300px_1fr_300px]">
//         <FieldPanel />
//         <SortableFieldsList />
//       </div>

//       <DragOverlay dropAnimation={null}>
//         {(source) =>
//           source.data.panelItem ? (
//             <div>Sidebar Item</div>
//           ) : (
//             <div>Sortable item</div>
//           )
//         }
//       </DragOverlay>
//     </DragDropProvider>
//   );
// }

// const categorizedFields = FIELD_REGISTRY.getCategorized();

// function FieldPanel() {
//   return (
//     <div className="scrollbar-stable sticky top-18 scrollbar-thin h-fit max-h-[calc(100dvh-110px)] overflow-hidden rounded-xl border bg-card py-6 pr-4 pl-6 hover:overflow-y-auto max-lg:hidden">
//       <h2 className="mb-1 font-semibold">Fields</h2>
//       <p className="mb-6 text-[13px] text-muted-foreground">
//         Drag a field to add to your form
//       </p>

//       {categorizedFields.map((category) => (
//         <div className="mb-6" key={category.label}>
//           <h3 className="mb-2 text-xs font-medium tracking-wider text-primary-text uppercase">
//             {category.label}
//           </h3>

//           <div className="grid grid-cols-2 gap-2">
//             {category.fields.map((field) => (
//               <FieldPanelItem key={field.type} field={field} />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// function FieldPanelItem({ field }: { field: FieldPlugin }) {
//   const { ref } = useDraggable({
//     id: field.type,
//     data: {
//       panelItem: true,
//       type: field.type,
//     },
//     sensors: [
//       PointerSensor.configure({
//         activationConstraints: [
//           new PointerActivationConstraints.Distance({ value: 0 }),
//           new PointerActivationConstraints.Delay({ value: 0, tolerance: 0 }),
//         ],
//       }),
//     ],
//   });

//   return (
//     <button
//       ref={ref}
//       className="flex cursor-grab flex-col items-center gap-2 rounded-lg border-2 p-3 text-sm font-medium hover:bg-muted active:cursor-grabbing"
//     >
//       <field.icon className="pointer-events-none size-7" />
//       {field.label}
//     </button>
//   );
// }

// function SortableFieldsList() {
//   const fields = useBuilderStore((state) => state.fields);

//   return (
//     <div>
//       <div className="mx-auto space-y-6 md:w-2xl">
//         {fields.map((field, i) => (
//           <FieldItem key={field.id} field={field} index={i} />
//         ))}
//       </div>
//       <LastItem />
//     </div>
//   );
// }

// function LastItem() {
//   const { ref, isDropTarget } = useDroppable({ id: "last-item" });

//   return (
//     <div ref={ref} className="mx-auto h-24 max-w-2xl pt-2">
//       {isDropTarget && <div className="h-1 w-full bg-primary"></div>}
//     </div>
//   );
// }

// function FieldItem({
//   field,
//   index,
// }: {
//   index: number;
//   field: FormSchemaField;
// }) {
//   const removeField = useBuilderStore((state) => state.removeField);

//   const { ref, isDragging, isDropTarget, isDragSource } = useSortable({
//     id: field.id,
//     type: "sortable",
//     index,
//     transition: { duration: 0, idle: false },
//   });

//   return (
//     <div
//       ref={ref}
//       className="relative rounded-xl border bg-card p-6"
//       style={{ opacity: isDragging ? 0.4 : 1 }}
//     >
//       <h2 className="mb-1 font-medium">{field.type}</h2>
//       <p>{field.id}</p>
//       <Button
//         variant="ghost"
//         aria-label="Drag field"
//         className="cursor-grab touch-none"
//         onClick={() => removeField(field.id)}
//       >
//         Delete
//       </Button>
//       {isDropTarget && !isDragSource && (
//         <div className="absolute -top-4 left-0 h-1 w-full bg-primary"></div>
//       )}
//     </div>
//   );
// }
