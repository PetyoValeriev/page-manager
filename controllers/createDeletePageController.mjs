import Page from '../models/Page.js';
import slugify from 'slugify';



export async function getAllPages(req, res) {
  try {
    const pages = await Page.find(); // Find all pages
    res.render('pages', { pages });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

export async function createPage(req, res) {
  try {
    const pageData = req.body;

    // Log the received request body for debugging
    console.log('Request Body:', pageData);

    // Check if 'slug' property exists in pageData
    if (!pageData || !pageData.slug) {
      console.log('Slug is missing');
      return res.status(400).send('Slug is missing');
    }

    const slug = slugify(pageData.slug, { lower: true }); // Generate slug
    pageData.slug = slug; // Add slug to pageData
    const page = new Page(pageData);
    await page.save();
    res.redirect(`/pages/${slug}`); // Redirect to the newly created page using the slug
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

export async function deletePage(req, res) {
  try {
    const slug = req.params.slug;
    if (!slug) {
      return res.status(400).send('Slug is missing');
    }

    const deletedPage = await Page.findOneAndRemove({ slug });

    if (!deletedPage) {
      return res.status(404).send('Page not found');
    }

    res.sendStatus(204); // Send a 204 No Content response if the page was deleted
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}



export async function getPageBySlug(req, res) {
  try {
    const slug = req.params.slug; // Use req.params.slug
    console.log('Slug:', slug); // Add this line for debugging
    const page = await Page.findOne({ slug });

    if (!page) {
      return res.status(404).send('Page not found');
    }

    res.render('page', { page });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}