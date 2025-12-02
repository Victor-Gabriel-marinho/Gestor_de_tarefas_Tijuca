import { useCallback, useEffect, useState } from "react";
import { LabelService } from "../../api/services/labelService";

type Tag = {
  id: string;
  Name: string;
  Color: string;
  isActive: boolean;
};

export function useTagsTeam(idTeam: string) {
  const [tagsTeam, setTagsTeam] = useState<Tag[]>([]);

  const fetchTagsTeam = useCallback(async () => {
    try {
      const response = await LabelService.Get_All_Label_Team(idTeam);
      setTagsTeam(response);
    } catch (error) {
      ("erro ao buscar as tags");
    }
  }, [idTeam]);
  useEffect(() => {
    if (idTeam) fetchTagsTeam();
  }, [fetchTagsTeam]);
  return { tagsTeam, fetchTagsTeam };
}
