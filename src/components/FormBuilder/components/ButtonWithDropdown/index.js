import React from 'react';
import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/solid'
import {tw} from 'twind';

export default function ButtonWithDropdown(props) {
    const {primaryBtn, dropdownOptions, dropdownBtnText} = props;
    return (
        <span className={tw`relative z-0 inline-flex shadow-sm rounded-md`}>
            {primaryBtn && <button
                type={primaryBtn.type ?? 'button'}
                ref={ref => {
                    if (ref)
                        primaryBtn.btnGroupRefs.saveAndCloseRef = ref
                }}
                className={tw`${dropdownOptions.length > 0 ? 'rounded-l-md' : 'rounded-md'} relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}
                onClick={primaryBtn.handleOnClick}
            >
                {primaryBtn.label}
            </button>}
            {dropdownOptions.length > 0 &&
            <Menu as="span" className={tw`-ml-px relative block`}>
                {({open}) => (
                    <>
                        <Menu.Button
                            className={tw`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500`}>
                            {dropdownBtnText ? <span>{dropdownBtnText}</span> :
                                <span className={tw`sr-only`}>Open options</span>}
                            <ChevronDownIcon className={tw`h-5 w-5`} aria-hidden="true"/>
                        </Menu.Button>
                        <Transition
                            show={open}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items
                                static
                                className={tw`origin-top-right absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none`}
                            >
                                {dropdownOptions && dropdownOptions.map((item, index) => (
                                    <div className={tw`py-1`} key={index}>
                                        <Menu.Item>
                                            {({active}) => (
                                                <button
                                                    type={item.type ?? 'button'}
                                                    className={tw`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} w-full px-2 py-1 text-sm text-left`}
                                                    onClick={item.handleOnClick}
                                                >
                                                    {item.label}
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                ))}
                            </Menu.Items>
                        </Transition>
                    </>
                )}
            </Menu>
            }

    </span>
    )
}
