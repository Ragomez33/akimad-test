import { createEvent } from "@cobuildlab/react-simple-state";
import { Repositories } from "./repositores-models";

export const onFetchRepositoriesByUser = createEvent<Repositories>();
export const onErrorFetchRepositoriesByUser = createEvent();