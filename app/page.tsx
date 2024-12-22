"use client";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { useForm, Controller, type Control } from "react-hook-form";
import { useMemo, useState, useCallback, useEffect } from "react";

import { fighters } from "../config/staticFighters";
import { type TFighter } from "../types";

import { title } from "@/components/primitives";

type TFormValues = {
  champion: TFighter;
  challenger: TFighter;
};

export default function Home() {
  const [battles, setBattles] = useState<TFighter[][]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { handleSubmit, control } = useForm<TFormValues>();

  const onSubmit = useCallback(
    (data: { challenger: TFighter; champion: TFighter }) => {
      setBattles([...battles, [data.challenger, data.champion]]);

      setHasSubmitted(true);
    },
    [battles, setBattles, setHasSubmitted],
  );
  const rounds = (Math.ceil(battles.length / 2) + 1)

  useEffect(() => {
    if (hasSubmitted) {
      setTimeout(() => {
        setHasSubmitted(false);
      }, 0);
    }
  }, [hasSubmitted, setHasSubmitted]);

  if (hasSubmitted) return <></>;

  return (
    <section className="flex flex-col items-center justify-center gap-4 md:py-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="inline-block max-w-xl text-center justify-center">
            <span className={title()}>Nixpayn&apos;s &nbsp;</span>
            <span className={title({ color: "violet" })}>FIGHT &nbsp;</span>
            <br />
            <span className={title()}> Emporium </span>
          </div>
        </section>
        <section className="flex flex-row items-center justify-center gap-4 py-8 md:py-10">
          <div>
            <FighterList control={control} fighterRole="challenger" />
          </div>
          <div> vs. </div>
          <div>
            <FighterList control={control} fighterRole="champion" />
          </div>
          <div>
            <button>add</button>
          </div>
        </section>
      </form>
      <section className={`flex flex-col ${battles?.length <= 1 ? 'items-center' : 'items-start'} justify-center gap-2 w-full justify-items-center`}>
        {battles.map((battle, index) =>{ 
          return <div key={index} ><Fight champion={battle[1]} challenger={battle[0]} /></div>
        })}
      </section>
    </section>
  );
}

type TFighterList = {
  control: Control<TFormValues>;
  fighterRole: "challenger" | "champion";
};
const FighterList = ({ control, fighterRole }: TFighterList) => {
  const fighterLookup = useMemo(() => {
    const lookup: Record<string, TFighter> = {};

    fighters.forEach((record) => {
      lookup[record.id] = record;
    });

    return lookup;
  }, []);

  return (
    <Controller
      control={control}
      name={fighterRole}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Autocomplete
              isRequired
              className="max-w-xs"
              errorMessage={error?.message}
              label="Select the challenger..."
              value={value?.id}
              onSelectionChange={(event) => {
                if (event) {
                  onChange(fighterLookup[event]);
                }
              }}
            >
              {Object.values(fighterLookup).map((record) => (
                <AutocompleteItem key={record.id}>
                  {record.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          </div>
        );
      }}
      rules={{ required: true }}
    />
  );
};

type TFight = {
  champion: TFighter;
  challenger: TFighter;
};
const Fight = ({ challenger, champion }: TFight) => {
  return (
    <section className="flex flex-col items-center justify-center gap-2 md:py-10">
      <div className="bg-slate-700 rounded-lg py-2 px-4">{challenger.name}</div>
      <div className="bg-slate-700 rounded-lg py-2 px-4">{champion.name}</div>
    </section>
  );
};
