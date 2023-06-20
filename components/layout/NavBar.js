import { Fragment, useState } from "react";
import { Dialog, Menu, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white drop-shadow-md mb-20">
      <nav
        className="mx-auto flex max-w-8xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">School System </span>
            <h1 className="h-6 w-auto text-2xl/6 ">School System</h1>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group
          data-testid="menu-buttons"
          className="hidden lg:flex lg:gap-x-12"
        >
          {/* People dropdown menu */}
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="flex text-base/6 font-semibold leading-6 text-gray-700">
                <span className="sr-only">Open user menu</span>
                People
                <svg
                  className="w-4 h-4 ml-1 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Menu.Button>
            </div>
            <Fragment>
              <Menu.Items
                data-testid="peopleDropdown"
                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
              >
                <Menu.Item>
                  <Link
                    href="/searchPeople"
                    className="block px-3 py-2 text-md text-gray-700"
                  >
                    Search People
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href="/addPerson"
                    className="block px-3 py-2 text-md text-gray-700"
                  >
                    Add Person
                  </Link>
                </Menu.Item>
              </Menu.Items>
            </Fragment>
          </Menu>

          {/* Schools dropdown menu */}
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="flex text-base/6 font-semibold leading-6 text-gray-700">
                <span className="sr-only">Open user menu</span>
                Schools
                <svg
                  className="w-4 h-4 ml-1 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Menu.Button>
            </div>
            <Fragment>
              <Menu.Items
                data-testid="schoolsDropdown"
                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
              >
                <Menu.Item>
                  <Link
                    href="/schoolList"
                    className="block px-3 py-2 text-md text-gray-700"
                  >
                    School List
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href="/schoolList/addSchool"
                    className="block px-3 py-2 text-md text-gray-700"
                  >
                    Add School
                  </Link>
                </Menu.Item>
              </Menu.Items>
            </Fragment>
          </Menu>

          {/* Classes dropdown menu */}
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="flex text-base/6 font-semibold leading-6 text-gray-700">
                <span className="sr-only">Open user menu</span>
                Classes
                <svg
                  className="w-4 h-4 ml-1 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Menu.Button>
            </div>
            <Fragment>
              <Menu.Items
                data-testid="classesDropdown"
                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
              >
                <Menu.Item>
                  <Link
                    href="/classList"
                    className="block px-3 py-2 text-md text-gray-700"
                  >
                    Class List
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href="/classList/addClass"
                    className="block px-3 py-2 text-md text-gray-700"
                  >
                    Add Class
                  </Link>
                </Menu.Item>
              </Menu.Items>
            </Fragment>
          </Menu>
        </Popover.Group>
      </nav>

      {/* mobile menu */}
      <Dialog
        as="div"
        data-testid="mobile-menu"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5  p-1.5">
              <span className="sr-only">School System</span>
              <h1 className="h-6 w-auto ">School System</h1>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {/* People dropdown menu */}
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="flex text-base/6 font-semibold leading-6 text-gray-700">
                      <span className="sr-only">Open user menu</span>
                      People
                      <svg
                        className="w-4 h-4 ml-1 mt-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Menu.Button>
                  </div>
                  <Fragment>
                    <Menu.Items className="absolute z-10 mt-2 w-40 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                      <Menu.Item>
                        <Link
                          href="/searchPeople"
                          className="block px-3 py-2 text-md text-gray-700"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Search People
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link
                          href="/addPerson"
                          className="block px-3 py-2 text-md text-gray-700"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Add Person
                        </Link>
                      </Menu.Item>
                    </Menu.Items>
                  </Fragment>
                </Menu>

                {/* Schools dropdown menu */}
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="flex text-base/6 font-semibold leading-6 text-gray-700">
                      <span className="sr-only">Open user menu</span>
                      Schools
                      <svg
                        className="w-4 h-4 ml-1 mt-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Menu.Button>
                  </div>
                  <Fragment>
                    <Menu.Items className="absolute z-10 mt-2 w-40 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                      <Menu.Item>
                        <Link
                          href="/schoolList"
                          className="block px-3 py-2 text-md text-gray-700"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          School List
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link
                          href="/schoolList/addSchool"
                          className="block px-3 py-2 text-md text-gray-700"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Add School
                        </Link>
                      </Menu.Item>
                    </Menu.Items>
                  </Fragment>
                </Menu>

                {/* Classes dropdown menu */}
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="flex text-base/6 font-semibold leading-6 text-gray-700">
                      <span className="sr-only">Open user menu</span>
                      Classes
                      <svg
                        className="w-4 h-4 ml-1 mt-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Menu.Button>
                  </div>
                  <Fragment>
                    <Menu.Items className="absolute z-10 mt-2 w-40 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                      <Menu.Item>
                        <Link
                          href="/classList"
                          className="block px-3 py-2 text-md text-gray-700"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Class List
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link
                          href="/classList/addClass"
                          className="block px-3 py-2 text-md text-gray-700"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Add Class
                        </Link>
                      </Menu.Item>
                    </Menu.Items>
                  </Fragment>
                </Menu>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
export default NavBar;
