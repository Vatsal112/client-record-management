import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IClient, IClientTableProps } from "@/types";

const ClientTable: React.FC<IClientTableProps> = ({
  clients,
  onDelete,
  onSave,
}) => {
  const [editingClient, setEditingClient] = useState<IClient | null>(null);
  const [editFormData, setEditFormData] = useState<IClient | null>(null);

  const handleEdit = (client: IClient) => {
    setEditingClient(client);
    setEditFormData(client);
  };

  const handleSave = () => {
    if (editFormData) {
      onSave(editFormData);
      setEditingClient(null);
      setEditFormData(null);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell>{client.id}</TableCell>
            <TableCell>
              {editingClient?.id === client.id ? (
                <Input
                  value={editFormData?.name || ""}
                  onChange={(e) =>
                    setEditFormData((prev) =>
                      prev ? { ...prev, name: e.target.value } : null
                    )
                  }
                />
              ) : (
                client.name
              )}
            </TableCell>
            <TableCell>
              {editingClient?.id === client.id ? (
                <Input
                  type="email"
                  value={editFormData?.email || ""}
                  onChange={(e) =>
                    setEditFormData((prev) =>
                      prev ? { ...prev, email: e.target.value } : null
                    )
                  }
                />
              ) : (
                client.email
              )}
            </TableCell>
            <TableCell>
              {editingClient?.id === client.id ? (
                <div className="flex gap-2">
                  <Button onClick={handleSave} variant="ghost" size="sm">
                    <FaSave className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => setEditingClient(null)}
                    variant="ghost"
                    size="sm"
                  >
                    <FaTimes className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(client)}
                    variant="ghost"
                    size="sm"
                  >
                    <FaEdit className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => onDelete(client.id)}
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <FaTrash className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClientTable;
