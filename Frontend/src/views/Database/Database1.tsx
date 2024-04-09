import React, { useState, useMemo, useEffect } from 'react'
import Table from '@/components/ui/Table'
import Pagination from '@/components/ui/Pagination'
import Select from '@/components/ui/Select'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table'
import type { ColumnDef, ColumnSort } from '@tanstack/react-table'
import { Base_Url } from '@/configs/app.config'
import Sorter from '@/components/ui/Table/Sorter'
import TBody from '@/components/ui/Table/TBody'
import THead from '@/components/ui/Table/THead'
import Td from '@/components/ui/Table/Td'
import Th from '@/components/ui/Table/Th'
import Tr from '@/components/ui/Table/Tr'

type Person = {
    Name: string
    Addiction_Type: string
    State: string
    Nasha_Mukti_Centre_Address: string
    Gender: string
}

type Option = {
    value: number
    label: string
}

const PaginationTable = () => {
    const columns = useMemo<ColumnDef<Person>[]>(
        () => [
            {
                header: 'Name',
                accessorKey: 'Name',
            },
            {
                header: 'Addiction Type',
                accessorKey: 'Addiction_Type',
            },
            {
                header: 'State',
                accessorKey: 'State',
            },
            {
                header: 'Nasha Mukti Centre Address',
                accessorKey: 'Nasha_Mukti_Centre_Address'
            },
            {
                header: 'Gender',
                accessorKey: 'Gender'
            }
        ],
        []
    )

    const [data, setData] = useState<Person[]>([])
    const [sorting, setSorting] = useState<ColumnSort[]>([])
    const [pageIndex, setPageIndex] = useState(0);
    const [totalData, setTotalData] = useState(0);
    const [loading, setLoading] = useState(true); // Add loading state

    // Page size options
    const pageSizeOption = [
        { value: 10, label: '10 / page' },
        { value: 20, label: '20 / page' },
        { value: 30, label: '30 / page' },
        { value: 40, label: '40 / page' },
        { value: 50, label: '50 / page' },
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(Base_Url + '/users')
                if (!response.ok) {
                    throw new Error('Failed to fetch data')
                }
                const responseData = await response.json()

                console.log('API Response:', responseData); // Log the API response

                if (!Array.isArray(responseData.data)) {
                    console.error('Invalid data format. Expected an array:', responseData.data)
                    // Optionally, handle this situation accordingly
                    return;
                }

                // Use responseData.data directly
                const mappedData: Person[] = responseData.data.map((item: any) => ({
                    Name: item.Name,
                    Addiction_Type: item.Addiction_Type,
                    State: item.State,
                    Nasha_Mukti_Centre_Address: item.Nasha_Mukti_Centre_Address,
                    Gender: item.Gender
                }));

                setData(mappedData)
                setTotalData(mappedData.length)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error)
                setLoading(false)
                // Optionally, you can set an error state here to display to the user
            }
        }
        fetchData()
    }, [])


    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const onPaginationChange = (page: number) => {
        // Update the page index state
        table.setPageIndex(page - 1);
        // Call the table's gotoPage method to update the page
       
    }

    const onSelectChange = (value: number) => {
        setPageIndex(0); // Reset to first page when changing page size
        table.setPageSize(value);
    }

    return (
        <div>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className:
                                                        header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : '',
                                                    onClick:
                                                        header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {
                                                    <Sorter
                                                        sort={header.column.getIsSorted()}
                                                    />
                                                }
                                            </div>
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {loading ? (
                        <Tr>
                            <Td colSpan={columns.length}>
                                Loading...
                            </Td>
                        </Tr>
                    ) : (
                        table.getRowModel().rows.map((row) => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </Td>
                                ))}
                            </Tr>
                        ))
                    )}
                </TBody>
            </Table>
            <div className="flex items-center justify-between mt-4">
                <Pagination
                    pageSize={table.getState().pagination.pageSize}
                    currentPage={table.getState().pagination.pageIndex + 1}
                    total={totalData}
                    onChange={onPaginationChange}
                />
                <div style={{ minWidth: 130 }}>
                    <Select<Option>
                        size="sm"
                        isSearchable={false}
                        value={pageSizeOption.find(
                            (option) => option.value === table.getState().pagination.pageSize
                        )}
                        options={pageSizeOption}
                        onChange={(option) => onSelectChange(option?.value || 0)}
                    />
                </div>
            </div>
        </div>
    )
}

export default PaginationTable
