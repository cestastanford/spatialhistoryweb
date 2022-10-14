
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" xmlns:p="http://www.evolus.vn/Namespace/Pencil" xmlns:html="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/xhtml">
    <xsl:output method="xml" media-type="text/html" doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN" doctype-system="DTD/xhtml1-strict.dtd" cdata-section-elements="script style" indent="yes" encoding="ISO-8859-1"/>
    <xsl:output method="html"/>

    <xsl:template match="/">
        <html>
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>
                    <xsl:value-of select="/p:Document/p:Properties/p:Property[@name='fileName']/text()"/>
                </title>
                <LINK rel="stylesheet" type="text/css" href="Resources/Style.css"><xsl:text></xsl:text></LINK>
            </head>
            <body>

                <xsl:for-each select="/p:Document/p:Pages/p:Page">

                    <div class="Page" id="{p:Properties/p:Property[@name='fid']/text()}_page">
                        <ul class="tabmenu">
                            <xsl:variable name="id_page" select="position()"/>
                            <xsl:for-each select="/p:Document/p:Pages/p:Page">
                                <li>
                                    <xsl:if test="position() = $id_page">
                                        <xsl:attribute name="class">active</xsl:attribute>
                                    </xsl:if>

                                    <a href="#{p:Properties/p:Property[@name='fid']/text()}_page" title="Go to page '{p:Properties/p:Property[@name='name']/text()}'">
                                        <xsl:value-of select="p:Properties/p:Property[@name='name']/text()"/>
                                    </a>
                                </li>
                            </xsl:for-each>
                        </ul>
                        <div class="ImageContainer">
                            <img class="raster" style="max-width:{p:Properties/p:Property[@name='width']/text()}px" src="{@rasterized}" usemap="#map_{p:Properties/p:Property[@name='fid']/text()}"/>
                        </div>
                        <xsl:if test="p:Note">
                            <p class="Notes">
                                <xsl:apply-templates select="p:Note/node()" mode="processing-notes"/>
                            </p>
                        </xsl:if>
                        <map name="map_{p:Properties/p:Property[@name='fid']/text()}">
                            <xsl:apply-templates select="p:Links/p:Link" />
                        </map>
                    </div>
                </xsl:for-each>
            </body>
        </html>
    </xsl:template>
    <xsl:template match="p:Link">
        <area shape="rect" coords="{@x},{@y},{@x+@w},{@y+@h}" href="#{@targetFid}_page" title="Go to page '{@targetName}'"/>
    </xsl:template>

    <xsl:template match="html:*" mode="processing-notes">
        <xsl:copy>
            <xsl:copy-of select="@*[local-name() != '_moz_dirty']"/>
            <xsl:apply-templates mode="processing-notes"/>
        </xsl:copy>
    </xsl:template>
    <xsl:template match="html:a[@page-fid]" mode="processing-notes">
        <a href="#{@page-fid}_page" title="Go tp page '{@page-name}'">
            <xsl:copy-of select="@class|@style"/>
            <xsl:apply-templates mode="processing-notes"/>
        </a>
    </xsl:template>
</xsl:stylesheet>
