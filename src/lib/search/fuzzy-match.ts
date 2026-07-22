/**
 * src/lib/search/fuzzy-match.ts
 *
 * Typo-tolerant matching via Levenshtein (edit) distance. Classic
 * single-row DP implementation — O(n*m) time, O(min(n,m)) space.
 *
 * Note on `!` non-null assertions below: under this project's
 * noUncheckedIndexedAccess tsconfig setting, every array index access
 * is typed as possibly undefined by default. Within this loop, every
 * index used is provably in-bounds by construction (previousRow always
 * has b.length + 1 entries; currentRow always has at least j + 1
 * entries at the point of access) — TypeScript just can't prove that
 * statically for a hand-rolled DP loop. The assertions are scoped
 * narrowly to exactly those provably-safe accesses.
 */

export function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  let previousRow: number[] = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 0; i < a.length; i++) {
    const currentRow: number[] = [i + 1];
    for (let j = 0; j < b.length; j++) {
      const insertCost = currentRow[j]! + 1;
      const deleteCost = previousRow[j + 1]! + 1;
      const substituteCost = previousRow[j]! + (a[i] === b[j] ? 0 : 1);
      currentRow.push(Math.min(insertCost, deleteCost, substituteCost));
    }
    previousRow = currentRow;
  }

  return previousRow[b.length]!;
}

/**
 * Scores how well `target` matches `query`, 0-100. Exact/prefix/substring
 * matches score highest and skip the edit-distance calculation entirely
 * (cheaper and more intuitive than fuzzy-scoring an exact match). Typo
 * tolerance kicks in only below that, with a stricter similarity
 * threshold for short queries so e.g. "diya" doesn't fuzzy-match
 * unrelated short words purely by chance.
 */
export function fuzzyScore(query: string, target: string): number {
  const q = query.trim().toLowerCase();
  const t = target.trim().toLowerCase();

  if (!q || !t) return 0;
  if (t === q) return 100;
  if (t.startsWith(q)) return 90;
  if (t.includes(q)) return 75;

  const distance = levenshteinDistance(q, t);
  const maxLen = Math.max(q.length, t.length);
  const similarity = 1 - distance / maxLen;

  const threshold = q.length <= 4 ? 0.75 : 0.6;
  if (similarity >= threshold) {
    return Math.round(similarity * 60);
  }

  return 0;
}
