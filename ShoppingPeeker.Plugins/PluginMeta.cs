﻿using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
namespace ShoppingPeeker.Plugins
{
    /// <summary>
    /// 插件的元信息-自描述信息
    /// </summary>
    public  class PluginMeta
    {
        public string Name { get; set; }

        public Version Version { get; set; }

        //public string Category { get; set; }

        //public string Author { get; set; }

        //public string Website { get; set; }

        //public string Description { get; set; }

        //public DateTime PublishDate { get; set; }

        #region 示范
//Name: Lucene
//AntiForgery: enabled
//Author: The Orchard Team
//Website: http://orchardproject.net
//Version: 1.6
//OrchardVersion: 1.4.1
//Description: The Lucene module enables the site to be indexed using Lucene.NET. The index generated by this module can then be used by the search module to provide an integrated full-text search experience to a web site.
//FeatureDescription: Lucene indexing services.
//Category: Search

        #endregion
    /// <summary>
    /// 加载插件自描述，从文件中
    /// </summary>
    /// <param name="metaFilePath"></param>
    public void LoadMetaManifest(string metaFilePath)
        {
            if (!File.Exists(metaFilePath))
            {
                return;
            }

            var contentLines = File.ReadAllLines(metaFilePath, Encoding.UTF8);
            if (contentLines.Length>0)
            {
                foreach (var line in contentLines)
                {
                    var array_line = line.Split(':');
                    if (array_line.Length<=0)
                    {
                        continue;
                    }
                    var propertyName = array_line[0].Trim().ToLower();
                    var propertyValue = line.Substring(line.IndexOf(':') + 1).Trim();
                    switch (propertyName)
                    {
                        case "name":
                            this.Name = propertyValue;
                            break;
                        case "version":
                            Version v = null;
                            Version.TryParse(propertyValue, out v);
                            this.Version = v;
                            break;

                        default:
                            break;
                    }
                }
            }
        }


    }
}