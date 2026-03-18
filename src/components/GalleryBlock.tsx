import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getPhotos, uploadPhoto } from "@/lib/api";
import { toast } from "sonner";

interface Photo {
  id: number;
  author_name: string;
  caption: string;
  photo_url: string;
  season: string;
}

const SEASON_LABELS: Record<string, string> = {
  winter: "Зима", spring: "Весна", summer: "Лето", autumn: "Осень",
};

export default function GalleryBlock({ season, compact }: { season?: string; compact?: boolean }) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedSeason, setSelectedSeason] = useState(season || "winter");
  const [preview, setPreview] = useState<string | null>(null);
  const [fileData, setFileData] = useState<string | null>(null);
  const [fileType, setFileType] = useState("image/jpeg");
  const [uploading, setUploading] = useState(false);
  const [viewPhoto, setViewPhoto] = useState<Photo | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getPhotos(season).then((data) => setPhotos(data.photos || []));
  }, [season]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileType(file.type);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setPreview(result);
      setFileData(result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!fileData) return;
    setUploading(true);
    try {
      const res = await uploadPhoto(name || "Аноним", caption, fileData, fileType, selectedSeason);
      if (res.success) {
        const newPhoto: Photo = {
          id: res.id,
          author_name: name || "Аноним",
          caption,
          photo_url: res.photo_url,
          season: selectedSeason,
        };
        setPhotos([newPhoto, ...photos]);
        setShowUpload(false);
        setPreview(null);
        setFileData(null);
        setName("");
        setCaption("");
        toast.success("Фото загружено!");
      }
    } finally {
      setUploading(false);
    }
  };

  const displayPhotos = compact ? photos.slice(0, 6) : photos;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground">
          {season ? `Галерея: ${SEASON_LABELS[season] || season}` : "Фотогалерея"}
          {photos.length > 0 && <span className="text-muted-foreground text-sm ml-2">({photos.length})</span>}
        </h4>
        <Button size="sm" onClick={() => setShowUpload(true)} className="bg-primary text-primary-foreground">
          + Загрузить фото
        </Button>
      </div>

      <div className={`grid gap-3 ${compact ? "grid-cols-3" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}>
        {displayPhotos.length === 0 && (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            Фотографий пока нет. Будь первым!
          </div>
        )}
        {displayPhotos.map((p) => (
          <button
            key={p.id}
            onClick={() => setViewPhoto(p)}
            className="relative aspect-square rounded-xl overflow-hidden group border border-border hover:border-accent transition-colors"
          >
            <img src={p.photo_url} alt={p.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
              <p className="text-white text-xs font-semibold truncate">{p.author_name}</p>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={showUpload} onOpenChange={setShowUpload}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-accent">Загрузить фото</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div
              className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-accent transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              {preview ? (
                <img src={preview} alt="preview" className="max-h-40 mx-auto rounded-lg object-contain" />
              ) : (
                <p className="text-muted-foreground">Нажми чтобы выбрать фото</p>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            <Input placeholder="Твоё имя" value={name} onChange={(e) => setName(e.target.value)} className="bg-muted/30 border-border" />
            <Input placeholder="Подпись к фото (необязательно)" value={caption} onChange={(e) => setCaption(e.target.value)} className="bg-muted/30 border-border" />
            {!season && (
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(SEASON_LABELS).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedSeason(key)}
                    className={`py-2 rounded-lg text-sm font-medium transition-colors ${selectedSeason === key ? "bg-primary text-primary-foreground" : "bg-muted/30 text-muted-foreground hover:bg-muted/50"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
            <Button onClick={handleUpload} disabled={!fileData || uploading} className="w-full bg-primary">
              {uploading ? "Загружаю..." : "Опубликовать"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewPhoto} onOpenChange={() => setViewPhoto(null)}>
        <DialogContent className="bg-card border-border max-w-lg">
          {viewPhoto && (
            <div className="space-y-3">
              <img src={viewPhoto.photo_url} alt={viewPhoto.caption} className="w-full rounded-xl object-contain max-h-96" />
              <div>
                <p className="font-semibold text-accent">{viewPhoto.author_name}</p>
                {viewPhoto.caption && <p className="text-foreground text-sm">{viewPhoto.caption}</p>}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
