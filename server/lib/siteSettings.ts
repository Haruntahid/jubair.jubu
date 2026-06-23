import { SiteSettings } from "../models/Portfolio.js";
import { DEFAULT_SECTIONS } from "../../shared/sections.js";

export async function getSiteSections() {
  const settings = await SiteSettings.findOne();
  if (!settings?.sections?.length) {
    return DEFAULT_SECTIONS;
  }

  const savedByKey = new Map(settings.sections.map((s) => [s.key, s]));
  const merged = DEFAULT_SECTIONS.map((defaults) => {
    const saved = savedByKey.get(defaults.key);
    return saved
      ? {
          key: defaults.key,
          label: saved.label || defaults.label,
          order: saved.order ?? defaults.order,
          visible: saved.visible ?? defaults.visible,
        }
      : defaults;
  });

  return merged.sort((a, b) => a.order - b.order);
}

export async function saveSiteSections(
  sections: Array<{ key: string; label: string; order: number; visible: boolean }>
) {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create({ sections });
  } else {
    settings.sections = sections;
    await settings.save();
  }
  return settings.sections.sort((a, b) => a.order - b.order);
}
