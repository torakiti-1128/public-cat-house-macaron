import { supabase } from "@/lib/supabaseClient";
import { KittenSelectMediaType, KittenSelectType } from "@/types/kitten";

//すべての募集中の子猫の詳細情報を取得する関数
export async function fetchAllRecruitingKittensWithMedia(): Promise<KittenSelectMediaType[]> {
    try {
        // 子猫の詳細情報を取得
        const kittens: KittenSelectType[] | null = await fetchRecruitingKittenSpecies();

        if (kittens && kittens.length > 0) { // nullチェックとlengthチェック
            // 画像URLを格納するための配列
            const kittensWithMedia: KittenSelectMediaType[] = await Promise.all(kittens.map(async (kitten) => {
                // 各子猫の画像URLを取得
                const mediaUrl = await fetchRecruitingKittenMediaUrls(kitten.kittenId);

                return {
                    kittenId: kitten.kittenId,  // kitten_idをkittenIdにマッピング
                    species: kitten.species,
                    url: mediaUrl, // メディアURLが存在しない場合はnullを返す
                };
            }));

            return kittensWithMedia; // すべての子猫情報を返す
        } 
        else {
            console.log('募集中の子猫が見つかりませんでした。');
            return []; // 空の配列を返す
        }
    } catch (error) {
        console.error(error);
        return []; // エラー時にも空の配列を返す
    }
}

//ご家族を募集している子猫の詳細情報を取得する関数
export async function fetchRecruitingKittenSpecies(): Promise<KittenSelectType[] | null> {
    try {
        const { data: kittens, error } = await supabase
            .from('kitten')
            .select('kitten_id, species'); // 必要な情報を指定

        if (!error) {
            // Supabaseのレスポンスの型を明示的に指定
            return kittens.map((kitten: { kitten_id: number; species: string }) => ({
                kittenId: kitten.kitten_id,
                species: kitten.species,
            }));
        } else {
            throw new Error(`取得できません: ${error.message}`);
        }
    } 
    catch (error) {
        console.error(error);
        return null; // エラー時にはnullを返す
    }
}

//ご家族を募集している子猫の画像URLを取得する関数
export async function fetchRecruitingKittenMediaUrls(kittenId: number): Promise<string | null> {
    try {
        const { data: mediaUrls, error } = await supabase
            .from('media')
            .select('url')
            .eq('kitten_id', kittenId)
            .eq('media_type', 'photo');

        // エラーチェック
        if (error) {
            throw new Error(`メディアURLの取得に失敗しました: ${error.message}`);
        }

        // メディアURLが存在し、最初の画像を取得
        if (mediaUrls && mediaUrls.length > 0) {
            return mediaUrls[0].url; // 最初のjpg画像のURL
        } 
        else {
            console.log('指定された子猫には画像がありません。');
            return null; // 画像がない場合はnullを返す
        }
    } 
    catch (error) {
        console.error(error);
        return null; // エラー時にはnullを返す
    }
}