"use client";

import { createContext, useContext } from "react";
import type { CountryCode, Entity } from "@/lib/entities";

type EntityContextValue = { entity: Entity; country: CountryCode };

const EntityContext = createContext<EntityContextValue | null>(null);

export function EntityProvider({
  entity,
  country,
  children,
}: EntityContextValue & { children: React.ReactNode }) {
  return (
    <EntityContext.Provider value={{ entity, country }}>
      {children}
    </EntityContext.Provider>
  );
}

export function useEntity(): EntityContextValue {
  const ctx = useContext(EntityContext);
  if (!ctx) throw new Error("useEntity must be used within an EntityProvider");
  return ctx;
}
