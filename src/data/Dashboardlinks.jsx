import { IoHome } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdBrandingWatermark } from "react-icons/md";
import { SiBookstack } from "react-icons/si";
import { IoBookSharp } from "react-icons/io5";



export const sidebarLinks = [
  {
    id: 1,
    name: "Admin",
    path:"admin-home",
    icon: <IoHome/>
  },
  {
    id: 2,
    name: "Author",
    path:"author-home",
    icon: <IoHome/>
  },
  {
    id: 3,
    name: "Book Authors",
    path:"book-authors",
    icon: <MdBrandingWatermark/>
  },
  {
    id: 4,
    name: "Category",
    path:"book-categories",
    icon: <BiSolidCategoryAlt/>
  },
  {
    id: 5,
    name: "Add Book",
    path:"add-book",
    icon: <IoBookSharp/>
  },
  {
    id: 6,
    name: "All Books",
    path:"all-books",
    icon: <SiBookstack/>
  }, 
  {
    id: 7,
    name: "Books",
    path:"books",
    icon: <SiBookstack/>
  }, 
   
];