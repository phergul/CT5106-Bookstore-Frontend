import { Publisher, PublisherEntry, PublisherResponse } from "../types";
import axios from "axios";

export const getPublishers = async (): Promise<PublisherResponse[]> => {
  const response = await axios.get(`http://localhost:8080/api/publishers`);
  return response.data._embedded.publishers;
};

export const deletePublisher = async (link: string): Promise<PublisherResponse> => {
  const response = await axios.delete(link);
  return response.data;
};

export const addPublisher = async (publisher: Publisher): Promise<PublisherResponse> => {
  const response = await axios.post(
    `http://localhost:8080/api/publishers`,
    publisher,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const updatePublisher = async (publisherEntry: PublisherEntry): Promise<PublisherResponse> => {
  const response = await axios.put(publisherEntry.url, publisherEntry.publisher, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
