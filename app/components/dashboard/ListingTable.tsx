import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { categories } from "../navbar/Categories";
import { Chip, Box, Tooltip } from "@mui/material";

interface RowData {
  id: string;
  name: string;
  description: string;
  category: string;
  instagram: string;
  phone: string;
  website: string;
  mail: string;
  province: string;
  street: string;
  no: string;
  locationValue: string;
}

export default function ListingTable() {
  const [rows, setRows] = useState<RowData[]>([]);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editedRow, setEditedRow] = useState<RowData | null>(null);

  const readMore = (text: string) => {
    const textCutOff = 10; // set a cutoff length
    if (text.length > textCutOff) {
      return text.substring(0, textCutOff) + "... more";
    } else {
      return text;
    }
  };

  const fetchListings = async () => {
    const response = await fetch("/api/listings");
    const data = await response.json();
    setRows(data);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const deleteListing = async (id: string) => {
    await fetch(`/api/listings/${id}`, { method: "DELETE" });
    fetchListings();
  };

  const updateListing = async (id: string) => {
    if (editedRow) {
      await fetch(`/api/listings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedRow),
      });
      fetchListings();
      setEditingRowId(null);
      setEditedRow(null);
    }
  };

  const onEditClick = (row: RowData) => {
    setEditingRowId(row.id);
    setEditedRow(row);
  };

  const handleFieldChange = (field: keyof RowData, value: string) => {
    setEditedRow((prev) => ({ ...prev, [field]: value } as RowData));
  };

  return (
    <TableContainer component={Paper} className="w-full overflow-x-auto">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Description{" "}
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Category
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Instagram
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Phone
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Website
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Email
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Province
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Street
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              No
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              LocationValue
            </TableCell>
            <TableCell align="right" style={{ fontWeight: "bold" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: RowData) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {editingRowId === row.id ? (
                // If the row is being edited, render input fields
                <>
                  <TableCell component="th" scope="row">
                    <TextField
                      value={editedRow?.name}
                      onChange={(e) =>
                        handleFieldChange("name", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      value={editedRow?.description}
                      onChange={(e) =>
                        handleFieldChange("description", e.target.value)
                      }
                    />
                  </TableCell>

                  <TableCell align="right">
                    <Listbox
                      value={editedRow?.category}
                      onChange={(value) => handleFieldChange("category", value)}
                    >
                      <div className="relative">
                        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg cursor-default focus:outline-none">
                          <span className="block truncate">
                            {editedRow?.category}
                          </span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"></span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {categories.map((category: { label: string }) => (
                              <Listbox.Option
                                key={category.label}
                                className={({ active }) =>
                                  `${
                                    active
                                      ? "text-amber-900 bg-amber-100"
                                      : "text-gray-900"
                                  }
                            cursor-default select-none relative py-2 pl-10 pr-4`
                                }
                                value={category.label}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`${
                                        selected ? "font-medium" : "font-normal"
                                      } block truncate`}
                                    >
                                      {category.label}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`${
                                          active
                                            ? "text-amber-600"
                                            : "text-amber-600"
                                        }
                                        absolute inset-y-0 left-0 flex items-center pl-3`}
                                      ></span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </TableCell>

                  <TableCell align="right">
                    <TextField
                      value={editedRow?.instagram}
                      onChange={(e) =>
                        handleFieldChange("instagram", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      value={editedRow?.phone}
                      onChange={(e) =>
                        handleFieldChange("phone", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      value={editedRow?.website}
                      onChange={(e) =>
                        handleFieldChange("website", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      value={editedRow?.mail}
                      onChange={(e) =>
                        handleFieldChange("mail", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      value={editedRow?.province}
                      onChange={(e) =>
                        handleFieldChange("province", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      value={editedRow?.street}
                      onChange={(e) =>
                        handleFieldChange("street", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      value={editedRow?.no}
                      onChange={(e) => handleFieldChange("no", e.target.value)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      value={editedRow?.locationValue}
                      onChange={(e) =>
                        handleFieldChange("locationValue", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                    >
                      <IconButton
                        edge="end"
                        color="inherit"
                        onClick={() => deleteListing(row.id)}
                        className="text-red-600"
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        color="inherit"
                        onClick={() => updateListing(row.id)}
                        className="text-green-600"
                      >
                        <SaveIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </>
              ) : (
                // If the row is not being edited, render data normally
                <>
                  <TableCell align="right">
                    <Tooltip title={row.name} placement="top-start">
                      <Chip label={readMore(row.name)} />
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title={row.description} placement="top-start">
                      <Chip label={readMore(row.description)} />
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title={row.category} placement="top-start">
                      <Chip label={readMore(row.category)} />
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title={row.instagram} placement="top-start">
                      <Chip label={readMore(row.instagram)} />
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title={row.phone} placement="top-start">
                      <Chip label={readMore(row.phone)} />
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title={row.website} placement="top-start">
                      <Chip label={readMore(row.website)} />
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title={row.mail} placement="top-start">
                      <Chip label={readMore(row.mail)} />
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title={row.province} placement="top-start">
                      <Chip label={readMore(row.province)} />
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title={row.street} placement="top-start">
                      <Chip label={readMore(row.street)} />
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title={row.no} placement="top-start">
                      <Chip label={readMore(row.no)} />
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">{row.locationValue}</TableCell>
                  <TableCell align="right">
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                    >
                      <IconButton
                        edge="end"
                        color="inherit"
                        onClick={() => deleteListing(row.id)}
                        className="text-red-600"
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        color="inherit"
                        onClick={() => onEditClick(row)}
                        className="text-blue-600"
                      >
                        <EditIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
