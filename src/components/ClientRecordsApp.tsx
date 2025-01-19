import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SearchBar from "./SearchBar";
import ClientTable from "./ClientTable";
import Pagination from "./Pagination";
import { IClient } from "@/types";
import FileUpload from "./FlieUpload";

const ClientRecordsApp: React.FC = () => {
  const [clients, setClients] = useState<IClient[]>([]);
  const [filteredClients, setFilteredClients] = useState<IClient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const recordsPerPage = 10;

  useEffect(() => {
    const filtered = clients.filter(
      (client) =>
        client.id.toString().includes(searchTerm) ||
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClients(filtered);
    setCurrentPage(1);
  }, [searchTerm, clients]);

  const handleUpload = (newClients: IClient[]) => {
    try {
      const uniqueClients = removeDuplicates(clients, newClients);
      setClients(uniqueClients);
      setError("");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Error processing file");
    }
  };

  const removeDuplicates = (
    existingClients: IClient[],
    newClients: IClient[]
  ): IClient[] => {
    const uniqueEmails = new Map<string, IClient>();
    const usedIds = new Set<number>();

    // First, process existing clients to maintain their original IDs
    existingClients.forEach((client) => {
      uniqueEmails.set(client.email.toLowerCase(), client);
      usedIds.add(client.id);
    });

    // Find the next available ID
    let nextId = Math.max(...Array.from(usedIds), 0) + 1;

    // Process new clients
    const resultClients = [...existingClients];

    newClients.forEach((client) => {
      const emailLower = client.email.toLowerCase();

      // Skip if email already exists
      if (!uniqueEmails.has(emailLower)) {
        // If ID conflicts with existing IDs, assign a new ID
        const newClient = {
          ...client,
          id: usedIds.has(client.id) ? nextId++ : client.id,
        };

        uniqueEmails.set(emailLower, newClient);
        usedIds.add(newClient.id);
        resultClients.push(newClient);
      }
    });

    return resultClients.sort((a, b) => a.id - b.id);
  };

  const handleEdit = (updatedClient: IClient) => {
    if (
      clients.some(
        (c) =>
          c.email.toLowerCase() === updatedClient.email.toLowerCase() &&
          c.id !== updatedClient.id
      )
    ) {
      setError("Email address must be unique");
      return;
    }

    const updatedClients = clients.map((client) =>
      client.id === updatedClient.id ? updatedClient : client
    );
    setClients(updatedClients);
    setError("");
  };

  const handleDelete = (id: number) => {
    setClients(clients.filter((client) => client.id !== id));
  };

  // Pagination calculations
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredClients.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredClients.length / recordsPerPage);

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Client Records Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <FileUpload onUpload={handleUpload} />
            <p className="text-destructive mt-2 text-lg text-center">{error}</p>
            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
            <ClientTable
              clients={currentRecords}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSave={handleEdit}
            />
            {filteredClients.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientRecordsApp;
