import { supabase } from "@/lib/supabaseClient";
import { KittenDetailType, KittenMediaType } from "@/types/kitten";

//選択された子猫の詳細を表示する関数
export async function fetchKittenDetail(kittenId: number): Promise<KittenDetailType | null> {
    try{
        const { data: kittens, error } = await supabase
            .from('kitten')
            .select('sex, species, color, features, birth, others')
            .eq('kitten_id', kittenId)
            .single();
            
        if (error){ 
            throw new Error(`子猫情報の取得に失敗しました: ${error.message}`);
        }
        
        return kittens;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

// ご家族を募集している子猫の画像URLを取得する関数
export async function fetchKittenMediaUrls(kittenId: number): Promise<KittenMediaType[] | null> {
    try {
        const { data: mediaUrls, error } = await supabase
            .from('media')
            .select('url')
            .eq('kitten_id', kittenId)
            .in('media_type', ['photo', 'video']);

        if (error) {
            throw new Error(`画像URLの取得に失敗しました: ${error.message}`);
        }

        return mediaUrls;
    } 
    catch (error) {
        console.error(error);
        return null;
    }
}
