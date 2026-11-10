import { test, expect, gotoPage } from '../fixtures';
import { SEL } from '../selectors';

const REFERENCE_PAGES = [
  'python_reference.asp',
  'python_ref_functions.asp',
  'python_ref_string.asp',
  'python_ref_list.asp',
  'python_ref_dictionary.asp',
  'python_ref_tuple.asp',
  'python_ref_set.asp',
  'python_ref_file.asp',
  'python_ref_keywords.asp',
  'python_ref_exceptions.asp',
  'python_ref_glossary.asp',
  'module_random.asp',
  'module_requests.asp',
  'module_statistics.asp',
  'module_math.asp',
  'module_cmath.asp',
];

test.describe('Exercises, Examples, Quiz and References', () => {
  test('Reference links return 200', async ({ page, request }) => {
    await gotoPage(page, '/python/');

    for (const href of REFERENCE_PAGES) {
      await expect(page.locator(`${SEL.main} a[href="${href}"]`).first(), href).toBeAttached();
      const response = await request.get(`/python/${href}`);
      expect(response.status(), href).toBe(200);
    }

    await page.locator(SEL.main).getByRole('link', { name: /String Methods/ }).first().click();
    await expect(page).toHaveURL(/python_ref_string\.asp$/);
    await expect(page.locator(SEL.mainH1)).toContainText('String Methods');
  });
});
